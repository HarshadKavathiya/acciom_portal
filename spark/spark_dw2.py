#! /bin/bash
import datetime
import sys

import requests
from pyspark import SparkContext
from pyspark.sql import SQLContext


class SparkCheck(object):
    def __init__(self):
        # conf = SparkConf()
        # conf.set("spark.executor.memory", "1g")

        self.sc = SparkContext("local", "first app")
        self.sqlContext = SQLContext(self.sc)
        self.dataframe_mysql_dest = None
        self.dataframe_mysql_source = None
        logger = self.sc._jvm.org.apache.log4j
        logger.LogManager.getLogger("org").setLevel(logger.Level.ERROR)
        logger.LogManager.getLogger("akka").setLevel(logger.Level.ERROR)

    def load_source(self, offset, limit, src_db_type):
        if src_db_type == 'mysql':
            self.dataframe_mysql_source = self.sqlContext.read.format("jdbc").option("url",
                                                                                     "jdbc:mysql://{0}/{1}".format(
                                                                                         source_hostname,
                                                                                         source_db)).option("driver",
                                                                                                            "com.mysql.jdbc.Driver").option(
                "dbtable",
                "(SELECT * FROM {0} ORDER BY 1 LIMIT {1},{2}) AS t".format(source_table, offset, limit)).option("user",
                                                                                                                '{0}'.format(
                                                                                                                    source_name)).option(
                "password", "{0}".format(source_password)).load()
        if src_db_type == 'sqlserver':
            print(offset, limit)
            self.dataframe_mysql_source = self.sqlContext.read.format("jdbc"). \
                option("url", "jdbc:sqlserver://{0};databaseName={1}".format(source_hostname, source_db)). \
                option("driver", "com.microsoft.sqlserver.jdbc.SQLServerDriver"). \
                option("dbtable", "(SELECT * FROM {0} ORDER BY 1 OFFSET {1} ROWS FETCH NEXT {2} ROWS ONLY) AS t".format(
                source_table, offset, limit)). \
                option("user", "{0}".format(source_name)). \
                option("password", "{0}".format(source_password)).load()
        if src_db_type == 'postgres':
            self.dataframe.mysql_source = self.sqlContext.read.format("jdbc"). \
                option("url", "jdbc:postgresql://{0}/{1}".
                       format(source_hostname, source_db)). \
                option("driver", "org.postgresql.Driver"). \
                option("dbtable", "(SELECT * FROM  {0} ORDER BY 1 OFFSET {1} LIMIT {2} ) AS t".format(
                source_table, offset, limit)). \
                option("user", "{0}".format(source_name)). \
                option("password", "{0}".format(source_password)).load()

    # print("select * from table limit {0} {1}".format(offset,limit))
    def load_destination(self, offset, limit, des_db_type):
        if des_db_type == 'mysql':
            self.dataframe_mysql_destination = self.sqlContext.read.format("jdbc").option("url",
                                                                                          "jdbc:mysql://{0}/{1}".format(
                                                                                              destination_hostname,
                                                                                              des_db)).option("driver",
                                                                                                              "com.mysql.jdbc.Driver").option(
                "dbtable", "(SELECT * FROM {0} ORDER BY 1 LIMIT {1},{2}) AS t".format(des_table, offset, limit)).option(
                "user", "{0}".format(destination_name)).option("password", "{0}".format(destination_password)).load()
        if des_db_type == 'sqlserver':
            print(offset, limit)
            print(des_table)
            self.dataframe_mysql_destination = self.sqlContext.read.format("jdbc").option("url",
                                                                                          "jdbc:sqlserver://{0};databaseName={1}".format(
                                                                                              destination_hostname,
                                                                                              des_db)).option("driver",
                                                                                                              "com.microsoft.sqlserver.jdbc.SQLServerDriver").option(
                "dbtable",
                "(SELECT * FROM {0} ORDER BY 1 OFFSET {1} ROWS FETCH NEXT {2} ROWS ONLY) AS t".format(des_table, offset,
                                                                                                      limit)).option(
                "user", "{0}".format(destination_name)).option("password", "{0}".format(destination_password)).load()

        if des_db_type == 'postgres':
            self.dataframe_mysql_destination = self.sqlContext.read.format("jdbc"). \
                option("url", "jdbc:postgresql://{0}/{1}".format(destination_hostname, des_db)). \
                option("driver", "org.postgresql.Driver"). \
                option("dbtable", "(SELECT * FROM {0} ORDER BY 1 OFFSET {1} LIMIT {2} ) AS t".format(
                des_table, offset, limit)). \
                option("user", "{0}".format(destination_name)). \
                option("password", "{0}".format(destination_password)).load()

    def datadiff(self):
        output = self.dataframe_mysql_source.subtract(self.dataframe_mysql_destination)
        return output


if __name__ == '__main__':
    source_db = sys.argv[1]
    source_table = sys.argv[2]
    src_db_type = sys.argv[3]
    des_db = sys.argv[4]
    des_table = sys.argv[5]
    des_db_type = sys.argv[6]
    api_end_point = sys.argv[7]
    row_count = sys.argv[8]
    limit_row = sys.argv[9]
    source_name = sys.argv[10]
    source_password = sys.argv[11]
    source_hostname = sys.argv[12]
    destination_name = sys.argv[13]
    destination_password = sys.argv[14]
    destination_hostname = sys.argv[15]
    total_count = 0
    final_result = []
    sc = SparkCheck()
    offset = 0
    rc = int(row_count)
    limit = int(limit_row)

    ct = 0
    print(datetime.datetime.now())

    while rc > 0:
        sc.load_source(offset, limit, src_db_type)
        sc.load_destination(offset, limit, des_db_type)
        result = sc.datadiff()
        result_op = result.toJSON().collect()
        total_count += result.toJSON().count()
        final_result.extend(result_op)
        rc = rc - limit
        offset = offset + limit
        # datadiff

    data = {"result": final_result, "result_count": total_count}
    result = requests.post(api_end_point, json=data)

