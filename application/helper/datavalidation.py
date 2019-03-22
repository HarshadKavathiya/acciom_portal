import subprocess

from flask import current_app

from index import basedir


def datavalidation(source_db, source_table, src_db_type, des_db,
                   des_table, des_db_type, spark_job_id, row_count,
                   limit_row, source_name, source_password, source_hostname,
                   destination_name, destination_password, destination_hostname):
    api_end_point = current_app.config.get('API_END_POINT') + "/api/spark-job-status/{0}".format(spark_job_id)
    driver_mem = current_app.config.get('DRIVER_MEMORY')
    executor_mem = current_app.config.get('EXECUTOR_MEMORY')
    print(source_db, des_db)

    sqljdbc = basedir + "/spark/sqljdbc42.jar"
    mysql_connector = basedir + "/spark/mysql-connector-java.jar"
    postgres_connector = basedir + "/spark/postgresql-42.2.5.jar"
    py_spark_file = basedir + "/spark/spark_dw2.py"
    subprocess.Popen('spark-submit  '
                     '--jars {0},'
                     '{1},'
                     '{2}'
                     ' {3} {4} {5} {6} {7} {8} {9}'
                     ' {10} {11} {12} '
                     '{13} {14} {15} {16} {17} {18} --driver-memory {19} --executor-memory {20}'.format(sqljdbc,
                                                                                                        mysql_connector,
                                                                                                        postgres_connector,
                                                                                                        py_spark_file,
                                                                                                        source_db,
                                                                                                        source_table,
                                                                                                        src_db_type,
                                                                                                        des_db,
                                                                                                        des_table,
                                                                                                        des_db_type,
                                                                                                        api_end_point,
                                                                                                        row_count,
                                                                                                        limit_row,
                                                                                                        source_name,
                                                                                                        source_password,
                                                                                                        source_hostname,
                                                                                                        destination_name,
                                                                                                        destination_password,
                                                                                                        destination_hostname,
                                                                                                        driver_mem,
                                                                                                        executor_mem),
                     shell=True,
                     universal_newlines=False)

