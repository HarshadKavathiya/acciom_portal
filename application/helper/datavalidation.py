import datetime
import json
import subprocess

from flask import current_app
from flask import current_app as app

from index import basedir


def datavalidation(source_db, source_table, src_db_type, des_db,
                   des_table, des_db_type, spark_job_id,
                   source_name, source_password, source_hostname,
                   destination_name, destination_password,
                   destination_hostname, srcqry, targetqry):
    api_end_point = "datavalidation=" + current_app.config.get(
        'API_END_POINT') + "/api/spark-job-status/{0}".format(
        spark_job_id)
    driver_mem = current_app.config.get('DRIVER_MEMORY')
    executor_mem = current_app.config.get('EXECUTOR_MEMORY')
    sqljdbc = basedir + "/spark/sqljdbc42.jar"
    mysql_connector = basedir + "/spark/mysql-connector-java.jar"
    postgres_connector = basedir + "/spark/postgresql-42.2.5.jar"
    py_spark_file = basedir + "/spark/spark_dw.py"
    src_record_count = current_app.config.get('SPARK_SOURCE_RECORDS_COUNT')
    target_record_count = current_app.config.get('SPARK_TARGET_RECORDS_COUNT')
    thread_count = current_app.config.get('SPARK_THREAD_COUNT')
    app.logger.info(
        "Data validation Job start at = {}".format(datetime.datetime.now()))
    print("Data validation Job start at = ", str(datetime.datetime.now()))
    print("queries", srcqry, targetqry)
    subprocess.Popen(
        'spark-submit --driver-memory {0} '
        '--executor-memory {1} --jars {2},{3},{4}'
        ' {5} {6} {7} {8} {9} {10} {11} '
        '{12} {13} {14} {15} {16} {17} {18} {19} {20} {21} {22} {23}'.format(
            driver_mem, executor_mem,
            sqljdbc, mysql_connector,
            postgres_connector,
            py_spark_file,
            source_hostname,
            source_name,
            source_password,
            source_db, source_table,
            src_db_type,
            destination_hostname,
            destination_name,
            destination_password,
            des_db, des_table,
            des_db_type,
            '{0}'.format(srcqry if srcqry else str(None)),
            '{0}'.format(srcqry if targetqry else str(None)),
            str(src_record_count),
            str(target_record_count),
            str(thread_count),
            api_end_point),
        shell=True, universal_newlines=False)
    app.logger.debug(str(datetime.datetime.now()))


def datavalidation_link(cursor, query):
    try:
        result = []
        cursor.execute(query)
        for row in cursor:
            result.append(list(map(str, row)))
        json_result = json.dumps(result)
        print("came here")
        return {"res": 1, "src_value": None,
                "des_value": json_result}
    except Exception as e:
        print(e)
        return {"res": 2, "src_value": None, "des_value": None}
