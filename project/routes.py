import os

from flask import send_from_directory

from index import jwt, app, api
from project.api.FileData import Upload, GetUpload, LogExport
from project.api.dbdetails import DbDetails
from project.api.runtest import DoTest
from project.api.sparkjob import SparkJobStatus
from project.api.user import (UserRegistration,
                              UserLogin, UserLogoutAccess,
                              TokenRefresh, AllUser)
from project.models.user import RevokedTokenModel


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return RevokedTokenModel.is_jti_blacklisted(jti)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    basedir = os.path.abspath(os.path.dirname(__file__))
    static_folder = basedir + '/static/dist/uploadfile/'
    if path != "" and os.path.exists(static_folder + path):
        return send_from_directory(static_folder, path)
    elif not (os.path.exists(static_folder + path) or (
            str(path).startswith("api/"))):
        print(path)
        return send_from_directory(static_folder, 'index.html')
    elif path == "":
        return send_from_directory(static_folder, 'index.html')


api.add_resource(UserRegistration, '/api/register')
api.add_resource(UserLogin, '/api/login')
api.add_resource(UserLogoutAccess, '/api/logout')
api.add_resource(AllUser, '/api/users')
api.add_resource(Upload, '/api/upload')
api.add_resource(DbDetails, '/api/add')
api.add_resource(TokenRefresh, '/api/token/refresh')
api.add_resource(GetUpload, '/api/getsuite/<int:user_id>')
api.add_resource(DoTest, '/api/testdb/')
api.add_resource(SparkJobStatus, '/api/spark-job-status/<int:spark_job_id>')
api.add_resource(LogExport, '/api/toexcel/<int:case_log_id>/')
