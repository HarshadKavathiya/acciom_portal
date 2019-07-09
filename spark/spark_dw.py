#! /bin/bash
import os
import sys
from threading import Thread
import requests
from pyspark import SparkConf
from pyspark import SparkContext
from pyspark.sql import SQLContext
from pyspark.sql.types import LongType


thread_count = int(sys.argv[17])
conf = SparkConf()
conf.set("appName", "first app")
conf.set("master", "local")
conf.set("spark.executor.cores", thread_count)
conf.set("spark.scheduler.mode", "FAIR")
current_path = os.path.abspath(os.path.dirname(__file__))
scheduler_path = os.path.join(current_path, "fairSchedular.xml")
conf.set("spark.scheduler.allocation.file", scheduler_path)
sc = SparkContext("local", "first app", conf=conf)
sqlContext = SQLContext(sc)
SQLContext.clearCache(sqlContext)
df_src_master = None
df_dest_master = None
changedtypedf = None  #  Used for Oracle as COUNT(1) is returning decimal type


def get_db_details(db_type, hostname, db_name, username, password, table_name,
                   custom_query):
    try:
        db_detail = {"db_type": db_type,
                     "hostname": hostname,
                     "db_name": db_name,
                     "username": username,
                     "password": password,
                     "table_name": table_name,
                     "count": 0,
                     "custom_query": custom_query if custom_query != str(
                         None) else None
                     }
        return db_detail
    except Exception as e:
        raise Exception("Exception Occurred in get_db_details method. Exception: {}".format(e))

def get_connection_detail(db_detail):
    try:

        if db_detail["db_type"] == "sqlserver":
            url = "jdbc:sqlserver://{0};databaseName={1}".format(
                db_detail["hostname"], db_detail["db_name"])
            driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
        elif db_detail["db_type"] == "mysql":
            url = "jdbc:mysql://{0}/{1}".format(db_detail["hostname"],
                                                db_detail["db_name"])
            driver = "com.mysql.jdbc.Driver"
        elif db_detail["db_type"] == "postgres":
            url = "jdbc:postgresql://{0}/{1}".format(db_detail["hostname"],
                                                     db_detail["db_name"])
            driver = "org.postgresql.Driver"
        elif db_detail["db_type"] == "oracle":
            # "url"------>"jdbc:oracle:thin:username/password@//hostname:portnumber/SID"
            url = "jdbc:oracle:thin:{0}/{1}@//{2}/{3}".format(db_detail["username"], db_detail["password"],
                                                              db_detail["hostname"], db_detail["db_name"])
            driver = "oracle.jdbc.driver.OracleDriver"
        return url, driver
    except Exception as e:
        raise Exception('Exception Occurred in get_connection_detail method. Exception: {}'.format(e))


def get_count(db_detail):
    try:

        # Count of 1 might return incorrect count, in case the first column has null value
        if not db_detail["custom_query"]:
            if db_detail["db_type"] == "oracle":
                query = "(SELECT count(1) as count FROM {}) t".format(db_detail["table_name"])
            else:
                query = " (SELECT count(1) as count FROM {}) as t".format(
                    db_detail["table_name"])
        else:
            if db_detail["db_type"] == "oracle":
                query = " (SELECT count(1) as count FROM ({}) t2) t".format(
                    db_detail["custom_query"])
            else:
                query = " (SELECT count(1) as count FROM ({}) as t2) as t".format(
                    db_detail["custom_query"])
        url, driver = get_connection_detail(db_detail)
        df = sqlContext.read.format("jdbc").option(
            "url", url).option("driver", driver).option(
            "dbtable", query).option("user", db_detail["username"]).option(
            "password", db_detail["password"]).load()
        print(query)
        # For Oracle DB, COUNT(1) Type is Decimal and returning count in CAPS, so type casting it to Integer and changing key to count
        if db_detail["db_type"] == "oracle":
            changedtypedf = df.withColumn("count", df["COUNT"].cast(LongType()))
        count = changedtypedf.collect() if db_detail["db_type"] == "oracle" else df.collect()
        print("COUNT   -----", count)
        return count[0] if count else None
    except Exception as e:
        raise Exception('Exception Occurred in get_count() method. Exception: {}'.format(e))

def get_df_select(db_detail, start, end):
    try:
        url, driver = get_connection_detail(db_detail)
        query = ""
        if not db_detail["custom_query"]:
            if db_detail["db_type"] == "sqlserver":
                query = "(SELECT * FROM {} " \
                        "ORDER BY 1 OFFSET {} " \
                        "ROWS FETCH NEXT  {} " \
                        "ROWS ONLY ) as t ".format(db_detail["table_name"], start,
                                                   end)
            elif db_detail["db_type"] == "mysql":
                query = "(SELECT * FROM {0} ORDER BY 1 LIMIT {1}, {2}) AS t".format(
                    db_detail["table_name"], start, end)
            elif db_detail["db_type"] == "postgres":
                query = "(SELECT * FROM  {0} ORDER BY 1 OFFSET {1} " \
                        "LIMIT {2} ) AS t".format(db_detail["table_name"], start,
                                                  end)
            elif db_detail["db_type"] == "oracle":
                query = "(SELECT * FROM {} " \
                        "ORDER BY 1 OFFSET {} " \
                        "ROWS FETCH NEXT  {} " \
                        "ROWS ONLY ) t ".format(db_detail["table_name"], start, end)

        else:
            if db_detail["db_type"] == "sqlserver":
                query = "(SELECT * FROM ({}) as tt " \
                        "ORDER BY 1 OFFSET {} " \
                        "ROWS FETCH NEXT  {} " \
                        "ROWS ONLY ) as t ".format(db_detail["custom_query"],
                                                   start, end)
            elif db_detail["db_type"] == "mysql":
                query = "(SELECT * FROM ({0}) as tt ORDER BY 1 LIMIT {1}, {2}) AS t".format(
                    db_detail["custom_query"], start, end)
            elif db_detail["db_type"] == "postgres":
                query = "(SELECT * FROM  ({0}) as tt ORDER BY 1 OFFSET {1} " \
                        "LIMIT {2} ) AS t".format(db_detail["custom_query"], start,
                                                  end)
            elif db_detail["db_type"] == "oracle":
                query = "(SELECT * FROM ({}) tt " \
                        "ORDER BY 1 OFFSET {} " \
                        "ROWS FETCH NEXT  {} " \
                        "ROWS ONLY ) t ".format(db_detail["custom_query"], start, end)
        df = sqlContext.read.format("jdbc").option(
            "url", url).option("driver", driver).option(
            "dbtable", query).option("user", db_detail["username"]).option(
            "password", db_detail["password"]).load()
        return df
    except Exception as e:
        raise Exception("Exception Occurred in get_df_select method. Exception: {}".format(e))

def run(src_db, dest_db, src_start, src_end, tgt_start, tgt_end):
    try:
        src_start = str(src_start)
        src_end = str(src_end)
        tgt_start = str(tgt_start)
        tgt_end = str(tgt_end)

        df_src = get_df_select(src_db, src_start, src_end)
        df_dest = get_df_select(dest_db, tgt_start, tgt_end)

        # Make DF is cacheable
        df_src.cache()
        df_dest.cache()

        #  Getting the data ready
        global df_src_master
        if not df_src_master:
            df_src_master = sqlContext.createDataFrame([], df_src.schema)
        global df_dest_master
        if not df_dest_master:
            df_dest_master = sqlContext.createDataFrame([], df_dest.schema)

        # Form collect query
        df_src_master = df_src_master.unionAll(df_src)
        df_dest_master = df_dest_master.unionAll(df_dest)
    except Exception as e:
        raise Exception("Exception Occurred in run method. Exception: {}".format(e))


def data_validation(df_src, df_dest):
    try:
        return df_src.subtract(df_dest).toJSON().collect()
    except Exception as e:
        raise Exception("Exception Occurred in data_validation method. Exception:{}".format(e))

def dup_rows(df):
    new_df = df.dropDuplicates()
    dup_df = df.subtract(new_df)
    return dup_df.toJSON().collect()

def handle_data_validation_error(exception):
    requests.post(testcases_tbr['datavalidation'], json={'result': 'error', 'exception': str(exception)})

class SparkException(Exception):
    pass


if __name__ == '__main__':
    try:
        # fetch source details
        src_db = get_db_details(db_type=sys.argv[6],
                                hostname=sys.argv[1],
                                db_name=sys.argv[4],
                                username=sys.argv[2],
                                password=sys.argv[3],
                                table_name=sys.argv[5],
                                custom_query=sys.argv[13]
                                )

        # fetch destination details
        dest_db = get_db_details(db_type=sys.argv[12],
                                 hostname=sys.argv[7],
                                 db_name=sys.argv[10],
                                 username=sys.argv[8],
                                 password=sys.argv[9],
                                 table_name=sys.argv[11],
                                 custom_query=sys.argv[14]
                                 )

        # Will use for no of record to return
        source_record_count = int(sys.argv[15])
        target_record_count = int(sys.argv[16])
        # tests and mapped callbacks
        # Call back api
        # Expecting testname=api_end_point
        testcases_tbr = dict([arg.split('=', maxsplit=1) for arg in sys.argv[18:]])

        if len(testcases_tbr) <= 0:
            raise Exception("No testcases provided")

        src_count = get_count(src_db)
        dest_count = get_count(dest_db)

        if src_count:
            src_db["count"] = src_count.asDict()["count"]

        if dest_count:
            print(dest_count.asDict()["count"])
            dest_db["count"] = dest_count.asDict()["count"]

        src_num = 1 if (src_db["count"]) < thread_count else int(
            (src_db["count"] / thread_count) + 1)

        tgt_num = 1 if (dest_db["count"]) < thread_count else int(
            (dest_db["count"] / thread_count) + 1)
        threads = []
        src_start = 0
        src_end = src_num
        tgt_start = 0
        tgt_end = tgt_num

        for thread_num in range(thread_count):
            th = Thread(target=run, args=(src_db, dest_db, src_start, src_end,
                                          tgt_start,
                                          tgt_end))
            th.start()
            threads.append(th)
            src_start = src_start + src_num
            tgt_start = tgt_start + tgt_num
            th.join()

        for testcase, api_end_point in testcases_tbr.items():
            result = {}
            if testcase == "datavalidation":
                src_to_dest = data_validation(df_src_master, df_dest_master)
                dest_to_src = data_validation(df_dest_master, df_src_master)
                # Filtering the number of rows to be passed to DB based on value mentioned in config file
                result["src_to_dest"] = src_to_dest[:source_record_count] if isinstance(src_to_dest, list) else []
                result["dest_to_src"] = dest_to_src[:target_record_count] if isinstance(dest_to_src, list) else []

                print("Source Type = ", type(result["src_to_dest"]))
                print("Target Type = ", type(result["dest_to_src"]))

                print("source count", df_src_master.count())
                print("TARGET count", df_dest_master.count())

                data = {"result": result,
                        "src_result_count": len(result["src_to_dest"]),
                        "target_result_count": len(result["dest_to_src"]),
                        "result_count": len(result["src_to_dest"]) + len(
                            result["dest_to_src"]),
                        "src_count": src_count,
                        "dest_count": dest_count}
                result = requests.post(
                    testcases_tbr['datavalidation'], json=data)

            elif testcase == "dupcheck":
                result = dup_rows(df_dest_master)
                data = {"result": result, "result_count": len(result)}
            else:
                raise SparkException("Invalid Test Case")
    except Exception as e:
        handle_data_validation_error(e)
