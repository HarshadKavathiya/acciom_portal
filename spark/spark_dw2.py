#! /bin/bash
import datetime
import sys

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
                                                                                     "jdbc:mysql://localhost/{0}".format(
                                                                                         source_db)).option("driver",
                                                                                                            "com.mysql.jdbc.Driver").option(
                "dbtable",
                "(SELECT * FROM {0} ORDER BY 1 LIMIT {1},{2}) AS t".format(source_table, offset, limit)).option("user",
                                                                                                                '{0}'.format(
                                                                                                                    dbmysql_user_name)).option(
                "password", "{0}".format(dbmysql_user_password)).load()
        if src_db_type == 'sqlserver':
            print(offset, limit)
            self.dataframe_mysql_source = self.sqlContext.read.format("jdbc").option("url",
                                                                                     "jdbc:sqlserver://localhost;databaseName={0}".format(
                                                                                         source_db)).option("driver",
                                                                                                            "com.microsoft.sqlserver.jdbc.SQLServerDriver").option(
                "dbtable",
                "(SELECT * FROM {0} ORDER BY 1 OFFSET {1} ROWS FETCH NEXT {2} ROWS ONLY) AS t".format(source_table,
                                                                                                      offset,
                                                                                                      limit)).option(
                "user", "{0}".format(dbsql_user_name)).option("password", "{0}".format(dbsql_user_password)).load()

    # print("select * from table limit {0} {1}".format(offset,limit))
    def load_destination(self, offset, limit, des_db_type):
        if des_db_type == 'mysql':
            self.dataframe_mysql_destination = self.sqlContext.read.format("jdbc").option("url",
                                                                                          "jdbc:mysql://localhost/{0}".format(
                                                                                              des_db)).option("driver",
                                                                                                              "com.mysql.jdbc.Driver").option(
                "dbtable", "(SELECT * FROM {0} ORDER BY 1 LIMIT {1},{2}) AS t".format(des_table, offset, limit)).option(
                "user", "{0}".format(dbmysql_user_name)).option("password", "{0}".format(dbmysql_user_password)).load()
        if des_db_type == 'sqlserver':
            print(offset, limit)
            print(des_table)
            self.dataframe_mysql_destination = self.sqlContext.read.format("jdbc").option("url",
                                                                                          "jdbc:sqlserver://localhost;databaseName={0}".format(
                                                                                              des_db)).option("driver",
                                                                                                              "com.microsoft.sqlserver.jdbc.SQLServerDriver").option(
                "dbtable",
                "(SELECT * FROM {0} ORDER BY 1 OFFSET {1} ROWS FETCH NEXT {2} ROWS ONLY) AS t".format(des_table, offset,
                                                                                                      limit)).option(
                "user", "{0}".format(dbsql_user_name)).option("password", "{0}".format(dbsql_user_password)).load()
        # print("select * from table limit {0} {1}".format(offset,limit))

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
    dbmysql_user_name = sys.argv[10]
    dbmysql_user_password = sys.argv[11]
    dbsql_user_name = sys.argv[12]
    dbsql_user_password = sys.argv[13]
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
        import ast

        result_op = ast.literal_eval(result.toJSON().collect())
        total_count += result.toJSON().count()
        final_result.extend(result_op)
        rc = rc - limit
        offset = offset + limit

    # result_oc = result.toJSON().count()
    # data = {"result": final_result, "result_count": total_count}

    # result = requests.put(api_end_point, data=data)
