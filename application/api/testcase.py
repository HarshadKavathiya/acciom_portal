import ast

from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from flask_restful import reqparse

from application.common.Response import error, success
from application.helper.runner_class import run_by_case_id
from application.models.user import TestSuite, SparkJob, TestCaseLog, TestCase


class TestCaseJob(Resource):
    @jwt_required
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('suite_id', type=int)
            parser.add_argument('case_id', type=int)
            data = parser.parse_args()
            if data['suite_id']:
                test_suite = TestSuite.query.filter_by(
                    test_suite_id=data['suite_id']).first()
                for each_test in test_suite.test_case:
                    # my_background_task.delay(each_test.test_case_id)
                    # TODO:CELERY PART.
                    run_by_case_id(each_test.test_case_id)
                return success({"success": True})
            else:
                # my_background_task.delay(data['case_id'])
                run_by_case_id(data['case_id'])
                return success({"success": True})
        except Exception as e:
            print("error", e)
            return error({"success": False, "msg": str(e)})


class TestCaseSparkJob(Resource):
    def post(self, spark_job_id):
        dict1 = request.data.decode('utf-8', 'ignore')
        res = ast.literal_eval(dict1)
        result = str(res['result'])
        result_count = res['result_count']
        spark_job = SparkJob.query.filter_by(spark_job_id=spark_job_id).first()
        print("primary key of testcaselog:", spark_job.test_case_log_id)

        case_log = TestCaseLog.query.filter_by(test_case_log_id=spark_job.test_case_log_id).first()
        if result_count == 0:
            case_log.execution_status = 1
            case_log.save_to_db()
            case = TestCase.query.filter_by(test_case_id=case_log.test_case_id).first()
            case.test_status = 1
            case.save_to_db()

        elif result_count != 0:
            case_log.execution_status = 2
            case_log.save_to_db()
            case_log.src_execution_log = str(result)
            case_log.save_to_db()
            case = TestCase.query.filter_by(test_case_id=case_log.test_case_id).first()
            case.test_status = 2
            case.save_to_db()
