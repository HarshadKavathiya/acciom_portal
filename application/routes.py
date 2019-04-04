import os

from flask import send_from_directory

from application.api.checkconnection import CheckConnection
from application.api.dbdetails import DbDetails
from application.api.login import (Register,
                                   Login, Logout, ResetPasswordEmail, ResetPassword, ResetPasswordInput,
                                   SettingNewPaswword, VerifyAccount)
from application.api.testcase import TestCaseJob, TestCaseSparkJob, EditTestCase
from application.api.testsuite import TestSuites, ExportTestLog, TestCaseLogDetail, ConnectionDetails, SelectConnection
from application.models.user import RevokedTokenModel
from index import jwt, app, api, static_folder


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return RevokedTokenModel.is_jti_blacklisted(jti)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(static_folder + path):
        return send_from_directory(static_folder, path)
    elif not (os.path.exists(static_folder + path) or (
            str(path).startswith("api/"))):
        return send_from_directory(static_folder, 'index.html')
    elif path == "":
        return send_from_directory(static_folder, 'index.html')


api.add_resource(Register, '/api/register')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(DbDetails, '/api/db-detail/', '/api/db-detail/<int:db_id>', '/api/db-detail-update/<int:db_id>', )
api.add_resource(TestSuites,
                 '/api/test-suite',
                 '/api/test-suite/<int:user_id>')
api.add_resource(TestCaseJob,
                 '/api/test-case-job')
api.add_resource(TestCaseSparkJob, '/api/spark-job-status/<int:spark_job_id>')
api.add_resource(ExportTestLog, '/api/export/<int:case_log_id>')
api.add_resource(EditTestCase, '/api/edit-test-case/<int:case_id>')
api.add_resource(TestCaseLogDetail, '/api/test-case-log/<int:test_case_log_id>')
api.add_resource(ResetPasswordEmail, '/api/reset-password-email')
api.add_resource(ResetPassword, '/api/reset-password-link/<string:token>')
api.add_resource(ResetPasswordInput, '/api/reset-password')
api.add_resource(SettingNewPaswword, '/api/change-password')
api.add_resource(VerifyAccount, '/api/verify-account/<string:token>')
api.add_resource(CheckConnection, '/api/check-connection')
api.add_resource(ConnectionDetails, '/api/connection-detail/<int:suite_id>')
api.add_resource(SelectConnection, '/api/select-connection')
