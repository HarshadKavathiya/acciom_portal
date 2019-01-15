from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate, MigrateCommand
from flask_restful import Api
from flask_script import Manager

from db import db
from models.user import RevokedTokenModel
from resources.FileData import Upload, GetUpload
from resources.dbdetails import DbDetails
from resources.runtest import DoTest
from resources.user import UserRegistration, \
    UserLogin, UserLogoutAccess, \
    TokenRefresh, AllUser

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = \
            'mysql+pymysql://Acciom_user:Acciomuser@localhost/Acciom_tool'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# SECRET_KEY = "EiEiO"
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379'
jwt = JWTManager(app)
api = Api(app)

migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

CORS(app, origins="http://localhost:4200", allow_headers=[
    "Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
     supports_credentials=True, intercept_exceptions=False)


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return RevokedTokenModel.is_jti_blacklisted(jti)


@app.before_first_request
def create_tables():
    db.create_all()

import os
basedir = os.path.abspath(os.path.dirname(__file__))
static_folder = basedir + '/static/dist/uploadfile/'


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(static_folder + path):
        return send_from_directory(static_folder, path)
    elif not path:
        return send_from_directory(static_folder, 'index.html')


api.add_resource(UserRegistration, '/register')
api.add_resource(UserLogin, '/login')
api.add_resource(UserLogoutAccess, '/logout')
api.add_resource(AllUser, '/users')
api.add_resource(Upload, '/upload')
api.add_resource(DbDetails, '/add')
api.add_resource(TokenRefresh, '/token/refresh')
api.add_resource(GetUpload, '/getsuite/<int:user_id>')
api.add_resource(DoTest, '/testdb/')

if __name__ == '__main__':
    from db import db

    db.init_app(app)
    #manager.run()

    app.run(port=8000, debug=True)
