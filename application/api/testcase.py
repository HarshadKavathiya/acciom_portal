import ast
import json

from flask import current_app as app
from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from flask_restful import reqparse

from application.common.Response import error, success
from application.helper.runner_class import run_by_case_id, split_table
from application.models.user import TestSuite, SparkJob, \
    TestCaseLog, TestCase, DbDetail
from index import db
from flasgger import swag_from



def db_details_without_password(db_id):
    db_list = {}
    """
    :return: returns the db_type,db_name,db_username,
    db_hostname,db_password based on
    db_id (foreign Key)
    """
    db_obj = DbDetail.query.filter_by(db_id=db_id).first()
    db_list['db_id'] = db_obj.db_id
    db_list['db_type'] = db_obj.db_type
    db_list['db_name'] = db_obj.db_name
    db_list['db_hostname'] = db_obj.db_hostname
    db_list['db_username'] = db_obj.db_username
    return db_list


class TestCaseJob(Resource):
    @jwt_required
    @swag_from('/application/apidocs/testcasejob.yml')
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
            app.logger.error(e)
            return error({"success": False, "msg": str(e)})


class TestCaseSparkJob(Resource):
    def post(self, spark_job_id):
        dict1 = request.data.decode('utf-8', 'ignore')
        res = ast.literal_eval(dict1)
        print("line 43", res['result']['src_to_dest'])
        result = json.dumps(res['result']['src_to_dest'])
        print(result)
        print(type(result))
        result_des = json.dumps(res['result']['dest_to_src'])
        print(type(result_des))
        result_count = res['result_count']
        spark_job = SparkJob.query.filter_by(spark_job_id=spark_job_id).first()
        case_log = TestCaseLog.query.filter_by(
            test_case_log_id=spark_job.test_case_log_id).first()
        if result_count == 0:
            case_log.execution_status = 1
            case_log.save_to_db()
            case = TestCase.query.filter_by(
                test_case_id=case_log.test_case_id).first()
            case.test_status = 1
            case.save_to_db()

        elif result_count != 0:
            if result == '[]':
                result = 'none'
            elif result_des == '[]':
                result_des = 'none'
            case_log.execution_status = 2
            case_log.save_to_db()
            case_log.src_execution_log = str(result)
            case_log.des_execution_log = str(result_des)
            case_log.save_to_db()
            case = TestCase.query.filter_by(
                test_case_id=case_log.test_case_id).first()
            case.test_status = 2
            case.save_to_db()


class EditTestCase(Resource):
    # @jwt_required
    # def delete(self, case_id):
    #     del_obj = TestCase.query.filter_by(test_case_id=case_id).one()
    #     db.session.delete(del_obj)
    #     db.session.commit()
    #     return {"success": True,
    #             "message": "Succesfully Deleted case {0}".format(case_id)}

    @jwt_required
    @swag_from('/application/apidocs/edittestcaseget.yml')
    def get(self, case_id):
        src_qry = ''
        des_qry = ''
        newlst = []
        obj = TestCase.query.filter_by(test_case_id=case_id).one()
        tabledetail = obj.test_case_detail
        tabledetails = ast.literal_eval(tabledetail)
        src_target_table = split_table(obj.test_case_detail)
        # tables = split_table(obj.table_src_target)
        src_db_id = DbDetail.query.filter_by(db_id=obj.src_db_id).first()
        des_db_id = DbDetail.query.filter_by(db_id=obj.target_db_id).first()
        Source_Detail = db_details_without_password(src_db_id.db_id)
        Target_Detail = db_details_without_password(des_db_id.db_id)
        if tabledetails['column'] is not {}:
            # column = obj.test_column
            column = tabledetails['column']
            keys = []
            for key in column:
                keys.append(key)
        if tabledetails['query'] == {}:
            src_qry = ''
            des_qry = ''
        else:
            queries = tabledetails["query"]
            print(queries)
            if obj.test_name == 'CountCheck':
                src_query = queries["srcqry"]
                target_query = queries["targetqry"]
                newlst.append(src_query)
                newlst.append(target_query)
                src_qry = newlst[0]
                des_qry = newlst[1]
            else:
                src_qry = 'None'
                des_qry = queries["targetqry"]

        payload = {"test_case_id": obj.test_case_id,
                   "test_name": obj.test_name,
                   "test_status": obj.test_status,
                   "src_table": src_target_table['src_table'],
                   "target_table": src_target_table['target_table'],
                   "test_queries": tabledetails['query'],
                   "src_column": 'None',
                   "des_column": keys,
                   "src_db_name": Source_Detail['db_name'],
                   "des_db_name": Target_Detail['db_name'],
                   "src_db_type": Source_Detail['db_type'],
                   "des_db_type": Target_Detail['db_type'],
                   "src_qry": src_qry,
                   "des_qry": des_qry}

        return {"success": True, "res": payload}

    @jwt_required
    @swag_from('/application/apidocs/edittestcaseput.yml')
    def put(self, case_id):
        parser = reqparse.RequestParser()
        parser.add_argument('src_table')
        parser.add_argument('target_table')
        parser.add_argument('src_query')
        parser.add_argument('target_query')
        data = parser.parse_args()
        obj = TestCase.query.filter_by(test_case_id=case_id).one()
        tabledetail = obj.test_case_detail
        tabledetails = ast.literal_eval(tabledetail)
        print("tabledetails", tabledetails)

        table = tabledetails["table"]

        for key in table:
            print(key)
        print(data['src_table'])
        table[data['src_table']] = key
        del table[key]
        table[data['src_table']] = data['target_table']

        queries = tabledetails["query"]
        if data['src_query'] == "" and data['target_query'] == "":
            tabledetails["query"] = {}
        else:
            queries['sourceqry'] = data['src_query']
            queries['targetqry'] = data['target_query']
        obj.test_case_detail = json.dumps(tabledetails)
        obj.save_to_db()
        return {"success": True, "message": "Succesfully Changed Values"}
