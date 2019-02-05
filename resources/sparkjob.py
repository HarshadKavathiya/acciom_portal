from flask_restful import Resource
import requests
import time
from multiprocessing import Process
from models.user import SparkJob,TestCaseLog,TestCase
from flask import request
import ast

class SparkJobStatus(Resource):
    def post(self, spark_job_id):
        dict1 = request.data.decode('utf-8', 'ignore')
        res = ast.literal_eval(dict1)
        result=str(res['result'])
        print(result)
        print(res['result_count'])
        print("testing spark_job iddddddddddd::", spark_job_id)
        process = Process(target=my_multi_process_job, args=(spark_job_id, res['result_count'], res["result"],))
        process.start()
        return True


def my_multi_process_job(spark_job_id, result_count, job_result):
    spark_job = SparkJob.query.filter_by(spark_job_id=spark_job_id).first()
    while True:
        result = requests.get('http://127.0.0.1:8998/batches/{0}'.format(spark_job.job_id))
        if result.ok:
            res = result.json()
            if res["state"] == "success" or res["state"] == "fail":
                    spark_job.status = res['state']
                    spark_job.save_to_db()
                    print("primary key of testcaselog:", spark_job.test_case_log_id)
                    case_log = TestCaseLog.query.filter_by(test_case_log_id=spark_job.test_case_log_id).first()
                    print("count", res["log"][1])
                    print("result_count", result_count)
                    if result_count == 0:
                        print("in up done")
                        case_log.execution_status = 1
                        case_log.save_to_db()
                        case = TestCase.query.filter_by(test_case_id=case_log.test_case_id).first()
                        case.test_status = 1
                        case.save_to_db()
                        break
                    elif result_count != 0:
                        print("in low  done")
                    case_log.execution_status = 2
                    case_log.save_to_db()
                    case_log.src_execution_log = str(job_result)
                    case_log.save_to_db()
                    case = TestCase.query.filter_by(test_case_id=case_log.test_case_id).first()
                    case.test_status = 2
                    case.save_to_db()
                    return
        else:
                time.sleep(2)
