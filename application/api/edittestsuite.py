

from flask import current_app as app
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from flask_restful import Resource, reqparse

from application.common.Response import error, success
from application.models.user import TestCase,DbDetail
from flasgger import swag_from
import json
import ast





class EditTestSuite(Resource):
    @jwt_required
    # @swag_from('/application/apidocs/dbdetailupdate.yml')
    def put(self, test_case_id):
            print(test_case_id)
            parser = reqparse.RequestParser()
            parser.add_argument('update')




            current_user = get_jwt_identity()
            db_obj = TestCase.query.filter_by(
                                            test_case_id=test_case_id).first()
            # print("1")
            data = parser.parse_args()
            string = json.dumps(ast.literal_eval(data["update"]))
            dic=json.loads(string)
            keyslist=[]
            for keys in dic:
                keyslist.append(keys)
            print(keyslist)




            if "test_name" in keyslist:
                 db_obj.test_name = dic["test_name"]
                 db_obj.save_to_db()
            if "test_id" in keyslist:
                db_obj.test_id = dic["test_id"]
                db_obj.save_to_db()
            if "sourceqry" in keyslist:
                dbdetails = db_obj.test_case_detail
                dbdetail=json.loads(dbdetails)
                dbdetail['query']['sourceqry']=dic["sourceqry"]
                db_obj.test_case_detail=json.dumps(dbdetail)
                db_obj.save_to_db()
            if "targetqry" in keyslist:
                dbdetails = db_obj.test_case_detail
                dbdetail = json.loads(dbdetails)
                dbdetail['query']['targetqry'] = dic["targetqry"]
                db_obj.test_case_detail = json.dumps(dbdetail)
                db_obj.save_to_db()
            if "sourcetable" in keyslist:
                dbdetails = db_obj.test_case_detail
                dbdetail = json.loads(dbdetails)
                print("64",dbdetail)
                for key in (dbdetail['table']):
                    print("65",key)
                    dbdetail['table'][dic["sourcetable"]] = dbdetail['table'].pop(key)
                print(dbdetail['table'])
                db_obj.test_case_detail = json.dumps(dbdetail)
                db_obj.save_to_db()

            if "targettable" in keyslist:
                dbdetails = db_obj.test_case_detail
                dbdetail = json.loads(dbdetails)
                print("75",dbdetail['table'])
                keys = dbdetail['table'].keys()
                for key in keys:
                    dbdetail['table'][key] = dic["targettable"]
                db_obj.test_case_detail = json.dumps(dbdetail)
                db_obj.save_to_db()

            if "targetcolumn" in keyslist:
                dbdetails = db_obj.test_case_detail
                dbdetail = json.loads(dbdetails)
                print(dic["targetcolumn"])
                newtargetcolumn=dic["targetcolumn"].replace(" ","")
                values=newtargetcolumn.split(",")
                print(values)
                newdic={}
                for targetcolumn in values:
                    newdic[targetcolumn ]=targetcolumn ;
                dbdetail['column']=newdic
                db_obj.test_case_detail = json.dumps(dbdetail)
                db_obj.save_to_db()

            if "srcdbid" in keyslist and dic["srctype"] == "source":
               db_obj.src_db_id=dic["srcdbid"]
               db_obj.save_to_db()

            if "targetdbid" in keyslist and dic["targettype"] == "target":
                db_obj.target_db_id = dic["targetdbid"]
                db_obj.save_to_db()











            # print(data['keys'],data['values'])
            # if data['keys']=="test_name":
            #     db_obj.test_name = data['values']
            #     db_obj.save_to_db()
            #     return {"success": True}
            #
            # if data['keys'] == "test_id":
            #     db_obj.test_id = data['values']
            #     db_obj.save_to_db()
            #     return {"success": True}
            # if data['keys'] == "sourceqry":
            #     dbdetails=db_obj.test_case_detail
            #     dbdetail=json.loads(dbdetails)
            #     dbdetail['query']['sourceqry']=data['values']
            #     db_obj.test_case_detail=json.dumps(dbdetail)
            #     db_obj.save_to_db()
            #     return {"success":True}
            # if data['keys'] == "targetqry":
            #     dbdetails = db_obj.test_case_detail
            #     dbdetail = json.loads(dbdetails)
            #     dbdetail['query']['targetqry'] = data['values']
            #     db_obj.test_case_detail = json.dumps(dbdetail)
            #     db_obj.save_to_db()
            #     return {"success": True}

class EditTestSuiteNew(Resource):
    @jwt_required
    # @swag_from('/application/apidocs/dbdetailupdate.yml')
    def put(self, db_id):
            parser = reqparse.RequestParser()
            parser.add_argument('update1')


            db_obj1 = DbDetail.query.filter_by(
                db_id=db_id).first()
            data = parser.parse_args()
            string = json.dumps(ast.literal_eval(data["update1"]))
            dic = json.loads(string)
            keyslist = []
            for keys in dic:
                keyslist.append(keys)
            print(keyslist)

            if "db_type" in keyslist:
                db_obj1.db_type=dic["db_type"]
                db_obj1.save_to_db()
            #     return {"success":True}
            if "db_name" in  keyslist:
                db_obj1.db_name = dic["db_name"]
                db_obj1.save_to_db()
            #     return {"success": True}
            if "db_hostname" in keyslist:
                db_obj1.db_hostname = dic["db_hostname"]
                db_obj1.save_to_db()
                # return {"success": True}
            if "db_username" in keyslist:
                db_obj1.db_username = dic["db_username"]
                db_obj1.save_to_db()
            #     return {"success": True}

# class UpdateDBDetail(Resource):
#     @jwt_required
#
#
#     # @swag_from('/application/apidocs/dbdetailupdate.yml')
#     def put(self, testcaseid):
#
#         parser = reqparse.RequestParser()
#         parser.add_argument('db_id')
#         parser.add_argument('event_type')
#
#         data = parser.parse_args()
#         print(testcaseid)
#         print(data["db_id"])
#         print(data["event_type"])
#
#
#         if data["event_type"]=="source":
#             print("in source")
#             db_obj = TestCase.query.filter_by(
#                 test_case_id=testcaseid).first()
#             db_obj.src_db_id=data["db_id"]
#             db_obj.save_to_db()
#         if data["event_type"] == "target":
#             print("intarget")
#             db_obj = TestCase.query.filter_by(
#                 test_case_id=testcaseid).first()
#             db_obj.target_db_id = data["db_id"]
#             db_obj.save_to_db()

















