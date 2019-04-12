import subprocess

from flask import current_app

from index import basedir


def datavalidation(source_db, source_table, src_db_type, des_db,
                   des_table, des_db_type, spark_job_id,
                   source_name, source_password, source_hostname,
                   destination_name, destination_password, destination_hostname):
    api_end_point = "datavalidation=" + current_app.config.get('API_END_POINT') + "/api/spark-job-status/{0}".format(
        spark_job_id)
    driver_mem = current_app.config.get('DRIVER_MEMORY')
    executor_mem = current_app.config.get('EXECUTOR_MEMORY')

    sqljdbc = basedir + "/spark/sqljdbc42.jar"
    mysql_connector = basedir + "/spark/mysql-connector-java.jar"
    postgres_connector = basedir + "/spark/postgresql-42.2.5.jar"
    py_spark_file = basedir + "/spark/spark_dw.py"
    print('spark-submit --driver-memory {0} --executor-memory {1} --jars {2} --jars {3} --jars {4}'
          ' {5} {6} {7} {8} {9} {10} {11} '
          '{12} {13} {14} {15} {16} {17} {18}'.format(driver_mem, executor_mem, sqljdbc, mysql_connector,
                                                      postgres_connector,
                                                      py_spark_file, source_hostname,
                                                      source_name, source_password,
                                                      source_db, source_table, src_db_type,
                                                      destination_hostname, destination_name,
                                                      destination_password, des_db, des_table,
                                                      des_db_type, api_end_point))
    subprocess.Popen('spark-submit --driver-memory {0} --executor-memory {1} --jars {2},{3},{4}'
                     ' {5} {6} {7} {8} {9} {10} {11} '
                     '{12} {13} {14} {15} {16} {17} {18}'.format(driver_mem, executor_mem, sqljdbc, mysql_connector,
                                                                 postgres_connector,
                                                                 py_spark_file, source_hostname,
                                                                 source_name, source_password,
                                                                 source_db, source_table, src_db_type,
                                                                 destination_hostname, destination_name,
                                                                 destination_password, des_db, des_table,
                                                                 des_db_type, api_end_point),
                     shell=True,
                     universal_newlines=False)
