from flask_restful import Resource, reqparse
import time
from flask_jwt_extended import jwt_required

from celery_task import my_background_task
from models.user import TestSuite
from test.runner_class import run_by_case_id

parser = reqparse.RequestParser()
parser.add_argument('suite_id', type=int)
parser.add_argument('case_id', type=int)


class DoTest(Resource):
    @jwt_required
    def post(self):
        data = parser.parse_args()
        print("data =  ", data)
        print(data['suite_id'])
        if data['suite_id']:
            time.sleep(1)
            test_suite = TestSuite.query.filter_by(test_suite_id=data['suite_id']).first()
            for each_test in test_suite.test_case:
                # my_background_task.delay(each_test.test_case_id)
                # TODO:CELERY PART.
                run_by_case_id(each_test.test_case_id)
            return {"success": True}
        else:
            time.sleep(1)
            # my_background_task.delay(data['case_id'])
            run_by_case_id(data['case_id'])
            return {"success": True}
