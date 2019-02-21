import os

from flask import send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate, MigrateCommand
from flask_restful import Api
from flask_script import Manager

from models.user import RevokedTokenModel
from models.user import db
from resources.FileData import Upload, GetUpload, LogExport
from resources.dbdetails import DbDetails
from resources.runtest import DoTest
from resources.sparkjob import SparkJobStatus
from resources.user import UserRegistration, \
    UserLogin, UserLogoutAccess, \
    TokenRefresh, AllUser
import inspect
import importlib
import logging
from logging.handlers import RotatingFileHandler
import pkgutil

from flask import Flask
from flask import Blueprint
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
jwt = JWTManager(app)
api = Api(app)

migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

CORS(app)


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return RevokedTokenModel.is_jti_blacklisted(jti)


@app.before_first_request
def create_tables():
    db.create_all()


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    basedir = os.path.abspath(os.path.dirname(__file__))
    static_folder = basedir + '/static/dist/uploadfile/'
    if path != "" and os.path.exists(static_folder + path):
        return send_from_directory(static_folder, path)
    elif not (os.path.exists(static_folder + path) or (str(path).startswith("api/"))):
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
api.add_resource(LogExport,'/api/toexcel/<int:case_log_id>')
db.init_app(app)

levels = {"DEBUG": logging.DEBUG,
          "INFO": logging.INFO,
          "ERROR": logging.ERROR,
          "WARNING": logging.WARNING}


def config_log(app):
    handler = RotatingFileHandler(app.config['LOG_LOCATION'], maxBytes=10000,
                                  backupCount=1)
    handler.setFormatter(logging.Formatter(app.config['LOG_FORMAT']))
    app.logger.addHandler(handler)
    app.logger.setLevel(app.config['LOG_LEVEL'])


def main():
    app.config.from_envvar('Acciom_var')
    #     # register_urls(api)
    config_log(app)
    app.run(host='0.0.0.0', port=8000, debug=True)


if __name__ == '__main__':
    main()
