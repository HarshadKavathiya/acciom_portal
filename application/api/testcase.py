import ast
import datetime
import json
from multiprocessing import Process

from flasgger import swag_from
from flask import current_app as app
from flask import request
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from flask_restful import Resource
from flask_restful import reqparse

from application.common.Response import (error, success)
from application.helper.runner_class import (run_by_case_id, split_table)
from application.helper.suite_runner import suite_level_send_mail
from application.models.user import (TestSuite, SparkJob, TestCaseLog,
                                     TestCase, DbDetail, User)
from index import db


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
            user_id = get_jwt_identity()
            user = User.query.filter_by(user_id=user_id).first()
            parser = reqparse.RequestParser()
            parser.add_argument('suite_id', type=int)
            parser.add_argument('case_id', type=int)
            data = parser.parse_args()
            if data['suite_id']:
                test_suite = TestSuite.query.filter_by(
                    test_suite_id=data['suite_id']).first()
                print(test_suite.test_suite_id)
                case_log_id_list = []
                for each_test in test_suite.test_case:
                    res = run_by_case_id(each_test.test_case_id)
                    case_log_id_list.append(res['result']['test_case_log_id'])
                p = Process(target=suite_level_send_mail,
                            args=(case_log_id_list, user.email,
                                  test_suite.test_suite_id))
                p.start()
                print(case_log_id_list, user.email,
                      test_suite.test_suite_id)
                return success(
                    {"success": True,
                     "message": "Job Submitted Succesfully for Suite id {0}".format(
                         data['suite_id'])})
            else:
                run_by_case_id(data['case_id'])
                return success(
                    {"success": True,
                     "message": "Job Submitted Succesfully for case id {0}".format(
                         data['case_id'])})
        except Exception as e:
            app.logger.error(e)
            return error({"success": False, "msg": str(e)})


class TestCaseSparkJob(Resource):
    def post(self, spark_job_id):
        print("Data validation Job ends at = ", str(datetime.datetime.now()))
        app.logger.info(
            "Data validation Job ends at = {}".format(
                datetime.datetime.now()))
        spark_job = SparkJob.query.filter_by(spark_job_id=spark_job_id).first()
        case_log = TestCaseLog.query.filter_by(
            test_case_log_id=spark_job.test_case_log_id).first()
        dict1 = request.data.decode('utf-8', 'ignore')
        res = ast.literal_eval(dict1)
        # Added logic to show error in case of any exception
        # Exception will be stored in error_log column in DB
        if res['result'] == 'error':
            case_log.error_log = res['exception']
            case_log.execution_status = 2
            case = TestCase.query.filter_by(
                test_case_id=case_log.test_case_id).first()
            case.test_status = 2
            case_log.save_to_db()
            case.save_to_db()
        else:
            result_src = json.dumps(res['result']['src_to_dest'])
            result_des = json.dumps(res['result']['dest_to_src'])
            src_count = res['src_result_count']
            target_count = res["target_result_count"]
            result_count = res['result_count']

            if result_count == 0:
                case_log.execution_status = 1
                case_log.save_to_db()
                case = TestCase.query.filter_by(
                    test_case_id=case_log.test_case_id).first()
                case.test_status = 1
                src_result = {}
                des_result = {}
                src_result['src_count'] = res['src_count']
                src_result['src_to_dest_count'] = src_count
                src_result['result'] = 'none'
                case_log.src_execution_log = str(src_result)
                des_result['tar_count'] = res['dest_count']
                des_result['dest_to_src_count'] = target_count
                des_result['result'] = 'none'
                case_log.des_execution_log = str(des_result)
                case_log.save_to_db()
                case.save_to_db()

            elif result_count != 0:
                if result_src == '[]':
                    result_src = 'none'
                elif result_des == '[]':
                    result_des = 'none'
                case_log.execution_status = 2
                case_log.save_to_db()
                src_result = {}
                des_result = {}
                src_result['src_count'] = res['src_count']
                src_result['src_to_dest_count'] = src_count
                src_result['result'] = str(result_src)
                des_result['tar_count'] = res['dest_count']
                des_result['dest_to_src_count'] = target_count
                des_result['result'] = str(result_des)
                case_log.src_execution_log = str(src_result)
                case_log.des_execution_log = str(des_result)
                case_log.save_to_db()
                case = TestCase.query.filter_by(
                    test_case_id=case_log.test_case_id).first()
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
    @swag_from('/application/apidocs/edittestcaseget.yml')
    def get(self, case_id):
        newlst = []
        obj = TestCase.query.filter_by(test_case_id=case_id).one()

        tabledetail = obj.test_case_detail
        tabledetails = ast.literal_eval(tabledetail)
        src_target_table = split_table(obj.test_case_detail)
        src_db_id = DbDetail.query.filter_by(db_id=obj.src_db_id).first()
        des_db_id = DbDetail.query.filter_by(db_id=obj.target_db_id).first()
        Source_Detail = db_details_without_password(src_db_id.db_id)
        Target_Detail = db_details_without_password(des_db_id.db_id)
        src_db_id = obj.src_db_id
        obj1 = DbDetail.query.filter_by(db_id=src_db_id).one()
        target_db_id = obj.target_db_id
        obj2 = DbDetail.query.filter_by(db_id=target_db_id).one()
        if tabledetails['column'] is not {}:
            column = tabledetails['column']
            print(column)
            # keys = []
            # for key in column:
            #     keys.append(key)
        if tabledetails['query'] == {}:
            src_qry = ''
            des_qry = ''
        else:
            queries = tabledetails["query"]
            print(queries)
            if obj.test_name == 'CountCheck':
                src_query = queries["sourceqry"]
                target_query = queries["targetqry"]
                newlst.append(src_query)
                newlst.append(target_query)
                src_qry = newlst[0]
                des_qry = newlst[1]
            elif obj.test_name == 'Datavalidation':
                src_query = queries["sourceqry"]
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
                   # "src_column": 'None',
                   "column": column,
                   "src_db_name": Source_Detail['db_name'],
                   "des_db_name": Target_Detail['db_name'],
                   "src_db_type": Source_Detail['db_type'],
                   "des_db_type": Target_Detail['db_type'],
                   "src_qry": src_qry,
                   "des_qry": des_qry,
                   "src_db_id": obj1.connection_name,
                   "target_db_id": obj2.connection_name}

        return {"success": True, "res": payload}

    @jwt_required
    @swag_from('/application/apidocs/edittestcaseput.yml')
    def put(self, case_id):
        parser = reqparse.RequestParser()
        parser.add_argument('src_table')
        parser.add_argument('target_table')
        parser.add_argument('src_query')
        parser.add_argument('target_query')
        parser.add_argument('column')
        parser.add_argument('src_db_id')
        parser.add_argument('target_db_id')
        data = parser.parse_args()
        print(data)
        obj = TestCase.query.filter_by(test_case_id=case_id).one()
        if data["src_db_id"] == None:
            obj.src_db_id = obj.src_db_id
        else:
            obj.src_db_id = data["src_db_id"]
        if data["target_db_id"] == None:
            obj.target_db_id = obj.target_db_id
        else:
            obj.target_db_id = data["target_db_id"]

        tabledetail = obj.test_case_detail
        tabledetails = ast.literal_eval(tabledetail)
        if data["column"] == "None" or data["column"] == "":
            tabledetails["column"] = {}
        else:
            removecolumnspaces = data["column"].replace(" ", "")
            if ";" and ":" in removecolumnspaces:
                tabledetails["column"] = {}
                x = removecolumnspaces.split(";")
                for i in x:
                    if ":" in i:
                        y = i.split(":")
                        tabledetails["column"][y[0]] = y[1]
                    else:
                        tabledetails["column"][i] = i
            elif ";" in data["column"]:
                tabledetails["column"] = {}
                removecolumnspaces = data["column"].replace(" ", "")
                p = removecolumnspaces.split(";")
                for q in p:
                    tabledetails["column"][q] = q
            else:
                tabledetails["column"] = {}
                removecolumnspaces = data["column"].replace(" ", "")
                tabledetails["column"][removecolumnspaces] = removecolumnspaces

        table = tabledetails["table"]
        for key in table:
            print("key",key)

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
        app.logger.debug(json.dumps(tabledetails))

        obj.save_to_db()
        return {"success": True, "message": "Succesfully Changed Values"}
