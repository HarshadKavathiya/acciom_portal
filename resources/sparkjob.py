import ast

from flask import request
from flask_restful import Resource

from models.user import SparkJob, TestCaseLog, TestCase


class SparkJobStatus(Resource):
    def post(self, spark_job_id):
        dict1 = request.data.decode('utf-8', 'ignore')
        res = ast.literal_eval(dict1)
        result = str(res['result'])
        print(result)
        print(res['result_count'])
        result_count = res['result_count']
        spark_job = SparkJob.query.filter_by(spark_job_id=spark_job_id).first()
        print("primary key of testcaselog:", spark_job.test_case_log_id)

        case_log = TestCaseLog.query.filter_by(test_case_log_id=spark_job.test_case_log_id).first()
        if result_count == 0:
            print("in up done")
            case_log.execution_status = 1
            case_log.save_to_db()
            case = TestCase.query.filter_by(test_case_id=case_log.test_case_id).first()
            case.test_status = 1
            case.save_to_db()

        elif result_count != 0:
            print("in low  done")
            case_log.execution_status = 2
            case_log.save_to_db()
            case_log.src_execution_log = str(result)
            case_log.save_to_db()
            case = TestCase.query.filter_by(test_case_id=case_log.test_case_id).first()
            case.test_status = 2
            case.save_to_db()
