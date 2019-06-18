import ast
import json
from io import BytesIO

from flask import current_app as app
from flask import request, Response
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, reqparse
from openpyxl import load_workbook

from application.api.dbdetails import create_dbconnection
from application.common.Response import success, error
# from celery_task import my_background_task
from application.helper.runner_class import run_by_case_id
from application.helper.runner_class import split_db
from application.models.user import TestSuite, TestCase, TestCaseLog, DbDetail,User
from flasgger import swag_from
from sqlalchemy.sql import select


parser = reqparse.RequestParser()
parser.add_argument('sheet')
parser.add_argument('selectedcase',
                    help='this field is requiredtfuhys',
                    required=True)
parser.add_argument('suitename',
                    help='this field is required',
                    required=True)
parser.add_argument('exvalue',
                    help='this field is required',
                    required=True)


def args_as_list(s):
    v = ast.literal_eval(s)
    if type(v) is not list:
        app.logger.debug('not in list')
    return v


class TestSuites(Resource):
    @jwt_required
    @swag_from('/application/apidocs/test_suitepost.yml',methods=['POST'])
    def post(self):
        current_user = get_jwt_identity()
        data = parser.parse_args()
        app.logger.debug(data)
        sheet = data['sheet']
        file = request.files['inputFile']
        print("48",file)
        suite_name = data['suitename']
        print("52",suite_name)
        if suite_name == "undefined":
            user_id = get_jwt_identity()
            suite_name = "Quality Suite"
            temp_file = TestSuite(user_id=user_id,
                                  excel_name=file.filename,
                                  test_suite_name=suite_name)
            temp_file.save_to_db()
        else:
            user_id = get_jwt_identity()
            temp_file = TestSuite(user_id=user_id,
                                  excel_name=file.filename,
                                  test_suite_name=suite_name)

            temp_file.save_to_db()
        wb = load_workbook(filename=BytesIO(file.read()))
        sheet_index = wb.sheetnames.index(sheet)
        ws = wb.worksheets[sheet_index]
        temp_test1 = [str(i - 2) for i in range(2, ws.max_row + 1)]
        temp_test = []
        for i in range(0, ws.max_column):
            if (str(ws[1][i].value) != 'None'):
                temp_test.append([str(ws[x][i].value)
                                  for x in range(2, ws.max_row)])
        data = parser.parse_args()
        test_case_list = str(data['selectedcase']).split(",")
        i = 0
        for j in range(ws.max_row - 1):
            if temp_test1[j] in test_case_list:
                test_case_list.remove(temp_test1[j])
                db_list = split_db(temp_test[i + 2][j])
                src_db_id = create_dbconnection(current_user,
                                                db_list[2].lower(),
                                                db_list[0],
                                                db_list[4].lower(),
                                                db_list[6])
                target_db_id = create_dbconnection(current_user,
                                                   db_list[3].lower(),
                                                   db_list[1],
                                                   db_list[5].lower(),
                                                   db_list[7])
                jsondict = {}
                columndata = temp_test[i + 4][j]
                column = {}
                if columndata == "None" or columndata.isspace():
                    pass
                else:
                    if ":" in columndata:
                        x = temp_test[i + 4][j].split(":")
                        z = []
                        for m in x:
                            y = m.split(";")
                            z.append(y)
                        column = {}
                        for n in range(len(z[0])):
                            column[z[0][n]] = z[1][n]

                    else:
                        columnlist = temp_test[i + 4][j].split(";")
                        column = {}
                        for k in range(len(columnlist)):
                            column[columnlist[k]] = columnlist[k]

                tablelist = temp_test[i + 3][j].split(":")
                table = {}
                table[tablelist[0]] = tablelist[1]
                query = {}
                p = temp_test[i + 5][j]
                if p == "None" or p.isspace():
                    pass
                else:
                    if ";" in p:
                        query_split = p.split(";")
                        final = [a.split(":") for a in query_split]
                        query["sourceqry"] = final[0][1]
                        query["targetqry"] = final[1][1]

                    else:
                        q = p.strip("targetqry:")
                        query["targetqry"] = q

                jsondict = {"column": column, "table": table, "query": query}

                temp = TestCase(test_suite_id=temp_file.test_suite_id,
                                test_id=temp_test[i + 1][j],
                                test_status=0,
                                test_case_detail=json.dumps(jsondict),
                                test_name=temp_test[i][j],
                                src_db_id=src_db_id,
                                target_db_id=target_db_id)
                temp.save_to_db()
        if int(data['exvalue']) == 1:
            test_suite = TestSuite.query.filter_by(
                test_suite_id=temp.test_suite_id).first()
            for each_test in test_suite.test_case:
                run_by_case_id(each_test.test_case_id)
        app.logger.debug('data saved to database')
        return {'message': 'data saved to database'}

    @swag_from('/application/apidocs/test_suiteget.yml')
    def get(self, user_id):
        try:
            return {"suites": TestSuite.return_all(user_id),
                    "success": True}
        except Exception as e:
            app.logger.debug(str(e))
            return {"success": False, "message": str(e)}


class TestCaseLogDetail(Resource):
    @swag_from('/application/apidocs/testcaselogdetail.yml')
    @jwt_required
    def get(self, test_case_log_id):
        return {"test_case_log": TestCaseLog.return_all_log(test_case_log_id),
                "success": True}


class ExportTestLog(Resource):
    @swag_from('/application/apidocs/exporttestlog.yml')
    def get(self, case_log_id):
        case_log = TestCaseLog.query.filter_by(
            test_case_log_id=case_log_id).first()
        test_case = case_log.test_cases
        response = []
        if test_case.test_name == 'Datavalidation':
            data = ast.literal_eval(case_log.src_execution_log)

            dict_key = ast.literal_eval(data[0])
            key_list = [key for key in dict_key.keys()]
            response.append(key_list)
            for i in range(len(data)):
                value_list = []
                value_list = [x for x in ast.literal_eval(data[i]).values()]
                response.append(value_list)
            response = json.dumps(response)
        elif test_case.test_name == 'CountCheck':
            src_response = case_log.src_execution_log
            des_response = case_log.des_execution_log
            res = [['Source Count', 'destination Count']]
            res.append([src_response, des_response])
            response = json.dumps(res)
        elif test_case.test_name == 'DuplicateCheck' or 'NullCheck':
            response = case_log.des_execution_log

        from openpyxl import Workbook
        from tempfile import NamedTemporaryFile
        wb = Workbook()
        ws = wb.active

        response = json.loads(response)
        for each in response:
            ws.append(list(each))

        with NamedTemporaryFile() as tmp:
            wb.save(tmp.name)
            tmp.seek(0)
            stream = tmp.read()
        return Response(
            stream,
            mimetype="application/vnd.openxmlformats-officedocument."
                     "spreadsheetml.sheet",
            headers={"Content-disposition": "attachment; "
                                            "filename=export123.xlsx"})


class ConnectionDetails(Resource):
    '''
    accepts suite_id of user and returns
     corresponding case_ids and connection_ids of user
    '''

    @jwt_required
    @swag_from('/application/apidocs/connectiondetails.yml')
    def get(self, suite_id):
        try:
            all_connection = []
            all_case = []
            current_user = get_jwt_identity()
            db_obj = DbDetail.query.filter_by(user_id=current_user).all()
            suite_obj = TestSuite. \
                query.filter_by(test_suite_id=suite_id).first()
            for i in suite_obj.test_case:
                pass
            all_case = [(i.test_case_id, i.test_name)
                        for i in suite_obj.test_case]
            all_connection = [i.db_id for i in db_obj]
            return {"all_connections": all_connection, "all_cases": all_case}
        except Exception as e:
            app.logger.error(str(e))
            return {"success": False, "message": str(e)}


class SelectConnection(Resource):
    @jwt_required
    @swag_from('/application/apidocs/selectconnection.yml')
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('connection_type',
                                help='This field cannot be blank',
                                required=True)
            parser.add_argument('case_id',
                                help='This field cannot be blank',
                                required=True,
                                type=args_as_list, default=[])
            parser.add_argument('db_id',
                                help='This field cannot be blank',
                                required=True)
            data = parser.parse_args()

            if data['connection_type'] == "source":
                for i in data['case_id']:
                    testcase = TestCase.query.filter_by(test_case_id=i).first()
                    testcase.src_db_id = data["db_id"]
                    testcase.save_to_db()

            elif data['connection_type'] == "dest":
                for i in data['case_id']:
                    testcase = TestCase.query.filter_by(test_case_id=i).first()
                    testcase.target_db_id = data["db_id"]
                    testcase.save_to_db()
            return success({"success": True, "message": "Updated Details"})
        except Exception as e:
            # app.loggger.error(e)
            return error({"success": False, "message": str(e)})


class TestSuiteList(Resource):
    @jwt_required
    def get(self):
        current_user = get_jwt_identity()
        print("271",current_user)
        # print("284",user_id)
        # test_suite=TestSuite.query.filter_by(
        #     user_id=current_user).first()
        # if test_suite:
        # print(TestSuite.return_all_suite(user_id))
        return {"suites": TestSuite.return_all_suite(current_user),
                "success": True}


class UserTestSuite(Resource):
    @jwt_required
    def get(self,test_suite_id):
        current_user = get_jwt_identity()
        print("271",current_user)
        test_case=TestCase.query.filter_by(
            test_suite_id=test_suite_id).first()
        if test_case:
            return {"suites": TestCase.return_all_case(test_suite_id),
                    "success": True}
        else:
            return{"message":"false"}
        # from sqlalchemy.orm import sessionmaker
        # import sqlalchemy
        # engine = sqlalchemy.create_engine('mysql://root:Password1234@localhost')
        # Session = sessionmaker(bind=engine)
        # session = Session()
        # session.query(TestCase).filter(TestCase.test_suite_id.in_((test_suite_id))).all()
        # engine.execute("select * from TestCase")


        # payload = {"test_case_id": test_case.test_case_id,
        #            "test_suite_id": test_case.test_suite_id,
        #            "test_id": test_case.test_id,
        #            "test_status": test_case.test_status,
        #            "test_case_detail": test_case.test_case_detail,
        #            "test_name": test_case.test_name,
        #            "src_db_id": test_case.src_db_id,
        #            "target_db_id": test_case.target_db_id,
        #
        #            }
        #
        # return {"success": True, "res": payload}

class UserList(Resource):
    def get(self):
        l=User.query.all()
        user=[]
        for i in l:
         user.append(i.user_id)
        return {"success":True,"res":user}

class CreateNewTestSuite(Resource):
    @jwt_required
    def post(self):

        parser = reqparse.RequestParser()
        parser.add_argument('testcases',
                            help='This field cannot be blank',
                            required=True,
                            type=args_as_list, default=[])
        parser.add_argument('suite_name',
                            help='This field cannot be blank',
                            required=True,
                            )
        data = parser.parse_args()
        user_id = get_jwt_identity()

        testcase=data["testcases"]

        test_case = TestCase.query.filter_by(
            test_case_id=testcase[0]).first()
        if test_case:
            get_execl_name=TestCase.return_excel_name(testcase[0])
            excel_name=get_execl_name["user"][0]["test_suite_id"][0]["excel_name"]
            print(user_id,excel_name,data["suite_name"])
            if data["suite_name"] == None:
               data["suite_name"] = "Quality Suite"
               temp_file = TestSuite(user_id=user_id,
                              excel_name=excel_name,
                              test_suite_name=data["suite_name"])
               temp_file.save_to_db()
               for i in data["testcases"]:
                   test_case = TestCase.query.filter_by(
                       test_case_id=i).first()
                   if test_case:
                       temp = TestCase(test_suite_id=temp_file.test_suite_id,
                                       test_id=test_case.test_id,
                                       test_status=test_case.test_status,
                                       test_case_detail=test_case.test_case_detail,
                                       test_name=test_case.test_name,
                                       src_db_id=test_case.src_db_id,
                                       target_db_id=test_case.target_db_id)
                       temp.save_to_db()
            elif data["suite_name"] == "":
                data["suite_name"] = "Quality Suite"
                temp_file = TestSuite(user_id=user_id,
                                      excel_name=excel_name,
                                      test_suite_name=data["suite_name"])
                temp_file.save_to_db()
                for i in data["testcases"]:
                    test_case = TestCase.query.filter_by(
                        test_case_id=i).first()
                    if test_case:
                        temp = TestCase(test_suite_id=temp_file.test_suite_id,
                                        test_id=test_case.test_id,
                                        test_status=test_case.test_status,
                                        test_case_detail=test_case.test_case_detail,
                                        test_name=test_case.test_name,
                                        src_db_id=test_case.src_db_id,
                                        target_db_id=test_case.target_db_id)
                        temp.save_to_db()

            else:
                temp_file = TestSuite(user_id=user_id,
                                      excel_name=excel_name,
                                      test_suite_name=data["suite_name"])
                temp_file.save_to_db()
                for i in data["testcases"]:
                    test_case = TestCase.query.filter_by(
                        test_case_id=i).first()
                    if test_case:
                        temp = TestCase(test_suite_id=temp_file.test_suite_id,
                                        test_id=test_case.test_id,
                                        test_status=test_case.test_status,
                                        test_case_detail=test_case.test_case_detail,
                                        test_name=test_case.test_name,
                                        src_db_id=test_case.src_db_id,
                                        target_db_id=test_case.target_db_id)
                        temp.save_to_db()

















