from flask import current_app as app
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from flask_restful import Resource, reqparse

from application.common.Response import error, success
from application.models.user import DbDetail

parser = reqparse.RequestParser()
parser.add_argument('connection_name', required=False)
parser.add_argument('type', help='this is required', required=True)
parser.add_argument('name', help='this is required', required=True)
parser.add_argument('hostname', help='this cannot be empty', required=True)
parser.add_argument('username', help='this is required', required=True)
parser.add_argument('password', help='this is required', required=True)


class DbDetails(Resource):
    @jwt_required
    def post(self):
        try:
            print("came here")
            data = parser.parse_args()
            current_user = get_jwt_identity()
            db_password = DbDetail.encrypt(data['password'])
            print(db_password)
            new_db = DbDetail(
                connection_name=data['connection_name'],
                user_id=current_user,
                db_type=data['type'],
                db_name=data['name'],
                db_hostname=data['hostname'],
                db_username=data['username'],
                db_password=db_password,
            )
            new_db.save_to_db()
            return success({"message": "success", "success": True})
        except Exception as e:
            return error({"message": str(e), "success": False})

    @jwt_required
    def get(self, db_id=None):
        current_user = get_jwt_identity()
        if db_id:
            db_obj = DbDetail.query.filter_by(user_id=current_user,
                                              db_id=db_id).first()
            return {'connection_name': db_obj.connection_name,
                    'db_id': db_obj.db_id,
                    'db_type': db_obj.db_type,
                    "db_name": db_obj.db_name,
                    'db_hostname': db_obj.db_hostname,
                    'db_username': db_obj.db_username,
                    'db_password': db_obj.db_password}
        else:
            def to_json(x):
                return {
                    'connection_name': x.connection_name,
                    'db_id': x.db_id,
                    'db_type': x.db_type,
                    'db_name': x.db_name,
                    'db_hostname': x.db_hostname,
                    'db_username': x.db_username,
                    'db_password': x.db_password
                }

            return {'connection': list(map(lambda x: to_json(x),
                                           DbDetail.query.filter_by
                                           (user_id=current_user)))}

    @jwt_required
    def put(self, db_id):
        try:
            current_user = get_jwt_identity()
            db_obj = DbDetail.query.filter_by(user_id=current_user,
                                              db_id=db_id).first()
            data = parser.parse_args()
            db_password = DbDetail.encrypt(data['password'])
            db_obj.connection_name = data['connection_name'],
            db_obj.db_type = data['type']
            db_obj.db_name = data['name']
            db_obj.db_hostname = data['hostname']
            db_obj.db_username = data['username']
            db_obj.db_password = db_password
            db_obj.save_to_db()

            return {"success": True,
                    'db_type': db_obj.db_type,
                    "db_name": db_obj.db_name,
                    'db_hostname': db_obj.db_hostname,
                    'db_username': db_obj.db_username,
                    'db_password': db_obj.db_password}
        except Exception as e:
            return error({"message": str(e), "success": False})


def create_dbconnection(current_user, db_type, db, hostname, username):
    app.logger.debug("inside db details ")
    temp = DbDetail.query.filter_by(user_id=current_user,
                                    db_type=db_type,
                                    db_name=db,
                                    db_hostname=hostname,
                                    db_username=username).first()
    if (temp):
        return temp.db_id
    else:
        temp = DbDetail(
            connection_name=None,
            user_id=current_user,
            db_type=db_type,
            db_name=db,
            db_hostname=hostname,
            db_username=username,
            db_password='None',
        )
        temp.save_to_db()
        return temp.db_id
