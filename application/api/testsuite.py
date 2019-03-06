import ast
import json
from io import BytesIO

from flask import request, Response
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, reqparse
from openpyxl import load_workbook

# from celery_task import my_background_task
from application.helper.runner_class import run_by_case_id
from application.models.user import TestSuite, TestCase, TestCaseLog

parser = reqparse.RequestParser()
parser.add_argument('sheet',
                    help='This field cannot be blank',
                    required=True)
parser.add_argument('selectedcase',
                    help='this field is required',
                    required=True)
parser.add_argument('suitename',
                    help='this field is required',
                    required=True)
parser.add_argument('exvalue',
                    help='this field is required',
                    required=True)


class TestSuites(Resource):
    @jwt_required
    def post(self):
        data = parser.parse_args()
        sheet = data['sheet']
        file = request.files['inputFile']
        suite_name = data['suitename']
        user_id = get_jwt_identity()
        temp_file = TestSuite(user_id=user_id,
                              excel_name=file.filename,
                              test_suite_name=suite_name)

        temp_file.save_to_db()
        wb = load_workbook(filename=BytesIO(file.read()))
        print("wb is", wb)
        sheet_index = wb.sheetnames.index(sheet)
        ws = wb.worksheets[sheet_index]
        temp_test = [[str(ws[x][0].value)
                      for x in range(2, ws.max_row + 1)]]
        # from column 2nd
        for i in range(1, ws.max_column):
            temp_test.append([str(ws[x][i].value)
                              for x in range(2, ws.max_row + 1)])
            data = parser.parse_args()

        test_case_list = str(data['selectedcase']).split(",")
        # print(test_case_list)

        i = 0
        # TODO: remove the hardcode colummn numbers
        #  and retrive the indexes of column
        # print(temp_test)
        for j in range(ws.max_row - 1):
            if temp_test[i][j] in test_case_list:
                temp = TestCase(test_suite_id=temp_file.test_suite_id,
                                test_id=temp_test[i][j],
                                test_status=0,
                                test_priority=temp_test[i + 2][j],
                                test_detail=temp_test[i + 3][j],
                                test_column=temp_test[i + 4][j],
                                table_src_target=temp_test[i + 5][j],
                                test_name=temp_test[i + 6][j],
                                test_queries=temp_test[i + 7][j],
                                test_expected=temp_test[i + 8][j],
                                test_actual=temp_test[i + 9][j],
                                test_created_by=temp_test[i + 10][j],
                                test_executed_by=temp_test[i + 11][j],
                                test_comment=temp_test[i + 12][j])
                temp.save_to_db()

        if int(data['exvalue']) == 1:
            # my_background_task.apply_async(countdown=15)
            test_suite = TestSuite.query.filter_by(
                test_suite_id=temp.test_suite_id).first()
            for each_test in test_suite.test_case:
                # TODO:my_background_task.apply_async(args=[each_test.test_case_id])
                run_by_case_id(each_test.test_case_id)
        return {'message': 'data saved to database'}

    def get(self, user_id):
        return {"suites": TestSuite.return_all(user_id),
                "success": True}


# class GetUpload(Resource):
#     def get(self, user_id):
#         # print(TestSuite.return_all(user_id))
#         # something new is added then only true??
#         return {"suites": TestSuite.return_all(user_id),
#                 "success": True}


class ExportTestLog(Resource):
    def get(self, case_log_id):
        print(case_log_id)
        case_log = TestCaseLog.query.filter_by(
            test_case_log_id=case_log_id).first()
        test_case = case_log.test_cases
        print(test_case.test_name)

        if test_case.test_name == 'DuplicateCheck' or 'NullCheck':
            print('came inside elif')
            response = case_log.des_execution_log
            return Response(response,
                            mimetype='application/vnd.openxmlformats-'
                                     'officedocument.spreadsheetml.sheet',
                            headers={"Content-disposition": "attachment;"})

        elif test_case.test_name == 'Datavalidation':
            print("came inside if")
            # data = [
            #  '{"Company_key":1,"CTL_ID":1,"DELETE_FLAG":"no","ID":"abc123","ISDELETED":"yes","CORDID":"xyz","NAMEY":"akhil","TYPEY":"int","CHILDID":"abc","BILLTREET":"xyz","CITY":"Bangalore","A_BILLINGSTATE":"Mumbai","A_BILLINGPOSTALCODE":"540qqe","A_BILLINGCOUNTRY":"India","A_BILLINGSTATECODE":"500010","A_BILLINGCOUNTRYCODE":"11","A_BILLINGLATITUDE":91.0000,"A_BILLINGLONGITUDE":81.0000,"A_BILLINGGEOCODEACCURACY":"yz","A_BILLINGADDRESS":"Whitefield","STREET":"varthur","CITY_1":"bangalore","STATE":"Ka","POSTALCODE":"560014","COUNTRY":"india","STATECODE":"10001","COUNTRYCODE":"911","LATITUDE":91.0000,"LONGITUDE":90.0000,"CODEACCURACY":"1","A_ADDRESS":"jpnagar","X_PHONE":"9909001230","F_FAX":"50010","X_ACCOUNTNUMBER":"1110","WEBSITE":"www.acciom.com","PHOTOURL":"xyz.com","SIL":"xyz","INDUSTRIES":"accion","REVENUE":4.0000,"NO_EMPLOYEES":100,"X_OWNERSHIP":"abc","B_TICKERSYMBOL":"999023","DESCRIBING":"lmn","RATING":"A10","SITE":"india","CURRENCY":"1000","OWNERID":"12","CREATEDDATE":"2019-02-09T00:00:00.000+05:30","CREATEDID":"20","MODIFIEDDATE":"2019-02-09T00:00:00.000+05:30","MODIFIEDBYID":"33","SYSTEMSTAMP":"2019-02-09T00:00:00.000+05:30","ACTIVITYDATE":"2019-02-09T00:00:00.000+05:30","VIEWEDDATE":"2019-02-09T00:00:00.000+05:30","REFERENCEDDATE":"2019-02-09T00:00:00.000+05:30","V_JIGSAW":"YES","K_JIGSAWCOMPANYID":"XYZ","L_CLEANSTATUS":"ZBC","J_ACCOUNTSOURCE":"CBC","DONSNUMBER":"989","TRADINGSTYLE":"SDF","K_NAICSCODE":"3BV","M_NAICSDESC":"VBN","STARTEDYEAR":"2019","SICDESC_P":"UIO","DANDBCOMPANYID_K":"UI8","CONNECTIONID":"IO9","SENTID":"PO9","RECORD_ID":"YT6","ADDED_FROM_DATA_COM":789.0000,"DATA_COM_MANAGED":90.0000,"DATA_COM_MATCHED":"RYRY","DATA_COM_DOES_NOT_A":"AS7","PARENTED_STATUS":"UI","DATA_CLEAN":"YES","NO_ACCOUNTS":20.0000,"REVIEW_PRIORITY":11.0000,"FORTUNE_RANK":2,"NUMBER_OF_J1_ACCOUNTS":8.0000,"NUMBER_OF_K2_ACCOUNTS":13.0000,"NUMBER_OF_L3_ACCOUNTS":13.0000,"NUMBER_OF_M4_ACCOUNTS":24.0000,"NUMBER_OF_N5_ACCOUNTS":24.0000,"N_ACCOUNTS":25.0000,"NB_ESCALATION_NOTES":"EIOIIE","NUMBER_OF_KL_ACCOUNTS":46.0000,"COMPANY_LKM_STATUS":"ACTIVE","LAST_REVIEWED_BY_MKJ":"2012A","KLMJ_CUSTOMER":"US","NUM_OF_ACCOUNTS_KLMNBG":56.0000,"HIGHEST_COMPANY_NAME":"HIGH","MATCHED_COM_ON_KFD":"2019-02-09T00:00:00.000+05:30","PL_REVIEWED_ON":"2019-02-09T00:00:00.000+05:30","EVER_ON":"E","ALL_OWNED":"Y","SUPPORT_OFFICER":"IND2","DATA_MIGRATION_P":"XBC","DELETE_RECORD_OFF":"N","DATA_QUALITY_ON":"OOP","DATA_QUALITY_OFF":24.0000,"DELETEDRAINKING":"yes","KJ_COMPANYID":44.0000,"MK_DEFAULTVISIBILITY":"default","NB_RETRIEVALFLAG":"no","MS_COMPANY_ID":"lmo1","APPLICATIONS_HOSTED_AT":"u18","BILLING_COUNTY_AM":"australia","BUDGET":13.0000,"CLOUD_IN_CUSTOMER":"xyz100","COMPANY_ACCESS_SUBMIT":"submit","COMPANY_LOGO":"acciom","COMPANY_PRIORITY":66.0000,"COMPANY_REGISTRATION":"iso","COMPLIANCE_REGULATING":"regular","COUNTRY_SUPPORTED":"asia","KL_PROFILENAME":"suresh","KJ_CRUNCHBASE":"char","CR_CUSTOM_REVENUE":77.0000,"NO_ACTIVELY_WORKING":"all","GH_ASSIGNED_DATE":"2019-02-09T00:00:00.000+05:30","N_HOSTING_PROVIDER":"all","JKLMHNH":"xyz","MKK":13.0000,"KLNK_SECTOR":"all","OLD_FGJ":"2019-02-09T00:00:00.000+05:30","OPT_UIO":"OUT","OTHER_HOSTED":"xyz","L_RECORD_ID":"op98","N_REFERENCE_ACCOUNT":"xyz","M_SEARCH_IN_HOOVERS":"yes","KLOI_COUNTY":"india","STATUSX_OP":"pass","SUBSIDIARY_OPL":"ues","KLL_NUMBER":"98a","CLOSED_KNK":66.0000,"OPEN_JKJNK":24.0000,"OWNER_NAME":"suresh","TERRITORY":"india","Start_Date":"2019-02-09T00:00:00.000+05:30","Effective_Date":"2019-02-09T00:00:00.000+05:30","Current_Record_Taken":2,"dg_timestamp":"2019-02-09T00:00:00.000+05:30","Updated_date_on":"2019-02-09T00:00:00.000+05:30","Company_Id_by":"acciom19","Company_Deleted_on":"19k","Company_Name_hj":"acciom","Company_Type_lm":"software","Company_Parent_Id_jkl":"19a","Company_kklm_Street":"whitefield","Company_Kl_City":"banglore","Company_Bklling_State":"krk","Company_Nm_Postal_Code":"560014","Company_Bl_Country":"india","Company_Bs_State_Code":"911","Company_Bp_Country_Code":"9112","Company_Be_Address":"goa","Company_Sa_Street":"21street","Company_Sa_City":"margoa","Company_Sa_State":"goa","Company_Sa_Postal_Code":"811","Company_Sa_Country":"india","Company_Sa_State_Code":"566","Company_Sa_Country_Code":"911","Company_Tin_Style":"51strreet","Company_BNJ_Code":"india","Company_Sa_Address":"asia","Company_Sa_County":"911911122","Company_Op_Territory":"5334","Company_Phone_Lk":"900899","Company_Fax_Jk":"www.acciom.com","Company_Ak_Number":"211a","Company_Web":"accion_lab","Company_SIN":"xyz","Company_In":"sw","Company_Owner":"5","Company_Describe":"india","Company_Ratingmkl":"ruppee","Company_Sited":"321a","Company_Currency_Ikl":"suresh","mk_Owner_Id":"32a","mkm_Owner_Name":"akhil","Co_Created_By_Id":"123id","Company_Cr_Datetime_Utc":"2019-02-09T00:00:00.000+05:30","Company_Creat_Datetime_Cst":"2019-02-09T00:00:00.000+05:30","Company_Cleaned_Status":"op","Company_Ac_Source":"software","Company_Dons_Number":"322a","Company_NAICJK_Description":"nill","Company_Yeardcd_Started":"1","Company_SICKLMHZX_Description":"xyz","Company_DandBNM_Id":"vbn","Company_Numberskxsmk_Of_Accounts":68.0000,"Company_Fortuneklm_Rank":2,"Company_Last_Reviewed_By_op":"1999a","Company_Last_Reviewed_On_lk":"2019-02-09T00:00:00.000+05:30","Company_Is_Rackspace_Customer_nmm":"nill","Company_Highest_Level_Name_nms":"xyz","Company_Market_Sector_aggh":"software","Company_Status_mnxmc":"active","Company_skxsj":"pass","Company_sxsnx":"working","Company_Start_Datetime_Cstdc":"2019-02-09T00:00:00.000+05:30","Company_End_Datetime_Cstdc":"2019-02-09T00:00:00.000+05:30","Company_Start_Datetime_Utcdcd":"2019-02-09T00:00:00.000+05:30","Company_End_Datetime_Utdcc":"2019-02-09T00:00:00.000+05:30","Record_Created_By_Dcd":"create","Record_Created_Datetime_Dcdk":"2019-02-09T00:00:00.000+05:30","Record_Updated_By_Cbh":"UPDATED","Record_Updated_Datetime_jbj":"2019-02-09T00:00:00.000+05:30"}']
            data = case_log.src_execution_log
            print(data)
            response = []
            # print("response data", type(ast.literal_eval(data[0])))
            dict_key = ast.literal_eval(data[0])
            key_list = [key for key in dict_key.keys()]
            value_list = [val for val in dict_key.values()]
            print("final list", type(key_list))
            response.append(key_list)
            response.append(value_list)
            print("final call", response)

            return Response(json.dumps(response),
                            mimetype='application/vnd.openxmlformats-'
                                     'officedocument.'
                                     'spreadsheetml.sheet',
                            headers={"Content-disposition": "attachment;"})
