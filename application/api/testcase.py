import ast

from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from flask_restful import reqparse

from application.common.Response import error, success
from application.helper.runner_class import run_by_case_id, db_details, split_table, split_query
from application.models.user import TestSuite, SparkJob, \
    TestCaseLog, TestCase, DbDetail
from index import db


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
                    run_by_case_id(each_test.test_case_id)
                return success({"success": True})
            else:
                # my_background_task.delay(data['case_id'])
                run_by_case_id(data['case_id'])
                return success({"success": True})
        except Exception as e:
            return error({"success": False, "msg": str(e)})


class TestCaseSparkJob(Resource):
    def post(self, spark_job_id):
        dict1 = request.data.decode('utf-8', 'ignore')
        res = ast.literal_eval(dict1)
        result = str(res['result'])
        result_count = res['result_count']
        spark_job = SparkJob.query.filter_by(spark_job_id=spark_job_id).first()

        case_log = TestCaseLog.query.filter_by \
            (test_case_log_id=spark_job.test_case_log_id).first()
        if result_count == 0:
            case_log.execution_status = 1
            case_log.save_to_db()
            case = TestCase.query.filter_by \
                (test_case_id=case_log.test_case_id).first()
            case.test_status = 1
            case.save_to_db()

        elif result_count != 0:
            case_log.execution_status = 2
            case_log.save_to_db()
            case_log.src_execution_log = str(result)
            case_log.save_to_db()
            case = TestCase.query.filter_by \
                (test_case_id=case_log.test_case_id).first()
            case.test_status = 2
            case.save_to_db()


class EditTestCase(Resource):
    @jwt_required
    def delete(self, case_id):
        del_obj = TestCase.query.filter_by(test_case_id=case_id).one()
        db.session.delete(del_obj)
        db.session.commit()
        return {"success": True,
                "message": "Succesfully Deleted case {0}".format(case_id)}

    @jwt_required
    def get(self, case_id):
        obj = TestCase.query.filter_by(test_case_id=case_id).one()
        tables = split_table(obj.table_src_target)
        src_db_id = DbDetail.query.filter_by(db_id=obj.src_db_id).first()
        des_db_id = DbDetail.query.filter_by(db_id=obj.target_db_id).first()
        Source_Detail = db_details(src_db_id.db_id)
        Target_Detail = db_details(des_db_id.db_id)
        if obj.test_column is not 'None':
            column = obj.test_column
        if obj.test_queries == 'None':
            src_qry = 'None'
            des_qry = 'None'
        else:
            if obj.test_name == 'CountCheck':
                lst = split_query(obj.test_queries)
                print(lst)
                src_qry = lst['src_qry']
                des_qry = lst['target_qry']
            else:
                lst = obj.test_queries.split(':')
                src_qry = 'None'
                des_qry = lst[1]

        payload = {"test_case_id": obj.test_case_id,
                   "test_name": obj.test_name,
                   "test_status": obj.test_status,
                   "src_table": tables['src_table'],
                   "target_table": tables['target_table'],
                   "test_queries": obj.test_queries,
                   "src_column": 'None',
                   "des_column": column,
                   "src_db_name": Source_Detail['db_name'],
                   "des_db_name": Target_Detail['db_name'],
                   "src_db_type": Source_Detail['db_type'],
                   "des_db_type": Target_Detail['db_type'],
                   "src_qry": src_qry,
                   "des_qry": des_qry}

        return {"success": True, "res": payload}
