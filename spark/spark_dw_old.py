#! /bin/bash
import os
import sys
from threading import Thread

import requests
from pyspark import SparkConf
from pyspark import SparkContext
from pyspark.sql import SQLContext

conf = SparkConf()
conf.set("appName", "first app")
conf.set("master", "local")
conf.set("spark.executor.cores", 4)
conf.set("spark.scheduler.mode", "FAIR")
current_path = os.path.abspath(os.path.dirname(__file__))
scheduler_path = os.path.join(current_path, "fairSchedular.xml")
conf.set("spark.scheduler.allocation.file", scheduler_path)
sc = SparkContext("local", "first app", conf=conf)
sqlContext = SQLContext(sc)
SQLContext.clearCache(sqlContext)
df_src_master = None
df_dest_master = None


def get_db_details(db_type, hostname, db_name, username, password, table_name):
    db_detail = {"db_type": db_type,
                 "hostname": hostname,
                 "db_name": db_name,
                 "username": username,
                 "password": password,
                 "table_name": table_name,
                 "count": 0}
    return db_detail


def get_connection_detail(db_detail):
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
    return url, driver


def get_count(db_detail):
    print(db_detail)
    query = " (SELECT count(*) as count FROM {}) as t".format(
        db_detail["table_name"])
    url, driver = get_connection_detail(db_detail)
    df = sqlContext.read.format("jdbc").option(
        "url", url).option("driver", driver).option(
        "dbtable", query).option("user", db_detail["username"]).option(
        "password", db_detail["password"]).load()
    print(query)
    count = df.collect()
    print("COUNT   -----", count)
    return count[0] if count else None


def get_df_select(db_detail, start, end):
    url, driver = get_connection_detail(db_detail)
    query = ""
    if db_detail["db_type"] == "sqlserver":
        query = "(SELECT * FROM {} " \
                "ORDER BY 1 OFFSET {} " \
                "ROWS FETCH NEXT  {} " \
                "ROWS ONLY ) as t ".format(db_detail["table_name"], start, end)
    elif db_detail["db_type"] == "mysql":
        query = "(SELECT * FROM {0} ORDER BY 1 LIMIT {1}, {2}) AS t".format(
            db_detail["table_name"], start, end)
    elif db_detail["db_type"] == "postgres":
        query = "(SELECT * FROM  {0} ORDER BY 1 OFFSET {1} " \
                "LIMIT {2} ) AS t".format(db_detail["table_name"], start, end)
    print(query)
    df = sqlContext.read.format("jdbc").option(
        "url", url).option("driver", driver).option(
        "dbtable", query).option("user", db_detail["username"]).option(
        "password", db_detail["password"]).load()
    return df


def run(src_db, dest_db, src_start, src_end, tgt_start, tgt_end):
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


def data_validation(df_src, df_dest):
    return df_src.subtract(df_dest).toJSON().collect()


def dup_rows(df):
    new_df = df.dropDuplicates()
    dup_df = df.subtract(new_df)
    return dup_df.toJSON().collect()


class SparkException(Exception):
    pass


if __name__ == '__main__':
    # fetch source details
    src_db = get_db_details(db_type=sys.argv[6],
                            hostname=sys.argv[1],
                            db_name=sys.argv[4],
                            username=sys.argv[2],
                            password=sys.argv[3],
                            table_name=sys.argv[5])

    # fetch destination details
    dest_db = get_db_details(db_type=sys.argv[12],
                             hostname=sys.argv[7],
                             db_name=sys.argv[10],
                             username=sys.argv[8],
                             password=sys.argv[9],
                             table_name=sys.argv[11])

    # tests and mapped callbacks
    # Call back api
    # Expecting testname=api_end_point
    testcases_tbr = dict([arg.split('=', maxsplit=1) for arg in sys.argv[13:]])

    if len(testcases_tbr) <= 0:
        raise Exception("No testcases provided")

    src_count = get_count(src_db)
    dest_count = get_count(dest_db)

    if src_count:
        src_db["count"] = src_count.asDict()["count"]

    if dest_count:
        print(dest_count.asDict()["count"])
        dest_db["count"] = dest_count.asDict()["count"]

    src_num = 1 if (src_db["count"]) < 4 else int((src_db["count"] / 4) + 1)

    tgt_num = 1 if (dest_db["count"]) < 4 else int((dest_db["count"] / 4) + 1)
    print(tgt_num)
    threads = []
    src_start = 0
    src_end = src_num
    tgt_start = 0
    tgt_end = tgt_num

    for thread_num in range(4):
        th = Thread(target=run, args=(src_db, dest_db, src_start, src_end,
                                      tgt_start,
                                      tgt_end))
        th.start()
        threads.append(th)
        src_start = src_start + src_num
        tgt_start = tgt_start + tgt_num
        th.join()

    # for thread_num in threads:
    #     thread_num.join()

    for testcase, api_end_point in testcases_tbr.items():
        result = {}
        try:
            if testcase == "datavalidation":

                result["src_to_dest"] = data_validation(df_src_master,
                                                        df_dest_master)
                result["dest_to_src"] = data_validation(df_dest_master,
                                                        df_src_master)

                print(result)
                print("source count", df_src_master.count())
                print("TARGET count", df_dest_master.count())
                data = {"result": result, "result_count": len(
                    result["src_to_dest"]) + len(
                    result["dest_to_src"])}
                result = requests.post(
                    testcases_tbr['datavalidation'], json=data)

            elif testcase == "dupcheck":
                result = dup_rows(df_dest_master)
                data = {"result": result, "result_count": len(result)}
            else:
                raise SparkException("Invalid Test Case")
        except Exception as e:
            print(e)
