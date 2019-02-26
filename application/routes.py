import os

from flask import send_from_directory

from application.api.FileData import TestSuites, ExportTestLog
from application.api.dbdetails import DbDetails
from application.api.runtest import TestCaseJob
from application.api.sparkjob import SparkJobStatus
from application.api.user import (Register,
                                  Login, Logout)
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
        print(path)
        return send_from_directory(static_folder, 'index.html')
    elif path == "":
        return send_from_directory(static_folder, 'index.html')


api.add_resource(Register, '/api/register')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(TestSuites, '/api/test-suite',
                 '/api/test-suite/<int:user_id>')
api.add_resource(DbDetails, '/api/add')
api.add_resource(TestCaseJob, '/api/testdb/')
api.add_resource(SparkJobStatus, '/api/spark-job-status/<int:spark_job_id>')
api.add_resource(ExportTestLog, '/api/export/<int:case_log_id>/')
