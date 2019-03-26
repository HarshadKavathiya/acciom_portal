from flask_jwt_extended import (jwt_required, get_jwt_identity)
from flask_restful import Resource, reqparse

from application.common.Response import error, success
from application.models.user import DbDetail

parser = reqparse.RequestParser()
parser.add_argument('type', help='this is required', required=True)
parser.add_argument('name', help='this is required', required=True)
parser.add_argument('hostname', help='this cannot be empty', required=True)
parser.add_argument('username', help='this is required', required=True)
parser.add_argument('password', help='this is required', required=True)


class DbDetails(Resource):
    @jwt_required
    def post(self):
        try:
            data = parser.parse_args()
            current_user = get_jwt_identity()
            new_db = DbDetail(
                user_id=current_user,
                db_type=data['type'],
                db_name=data['name'],
                db_hostname=data['hostname'],
                db_username=data['username'],
                db_password=data['password'],
            )
            new_db.save_to_db()
            return success({"message": "success", "success": True})
        except Exception as e:
            return error({"message": str(e), "success": False})

    @jwt_required
    def get(self, db_id=None):
        current_user = get_jwt_identity()
        if db_id:
            db_obj = DbDetail.query.filter_by(user_id=current_user, db_id=db_id).first()
            return {'db_id': db_obj.db_id, 'db_type': db_obj.db_type, "db_name": db_obj.db_name,
                    'db_hostname': db_obj.db_hostname, 'db_username': db_obj.db_username,
                    'db_password': db_obj.db_password}
        else:
            def to_json(x):
                return {
                    'db_id': x.db_id,
                    'db_type': x.db_type,
                    'db_name': x.db_name,
                    'db_hostname': x.db_hostname,
                    'db_username': x.db_username,
                    'db_password': x.db_password
                }

            return {'connection': list(map(lambda x: to_json(x), DbDetail.query.filter_by(user_id=current_user)))}

    @jwt_required
    def put(self, db_id):
        try:
            db_obj = DbDetail.query.filter_by(db_id=db_id).first()
            data = parser.parse_args()
            db_obj.db_type = data['type']
            db_obj.db_name = data['name']
            db_obj.db_hostname = data['hostname']
            db_obj.db_username = data['username']
            db_obj.db_password = data['password']
            db_obj.save_to_db()

            return {"success": True, 'db_type': db_obj.db_type, "db_name": db_obj.db_name,
                    'db_hostname': db_obj.db_hostname,
                    'db_username': db_obj.db_username, 'db_password': db_obj.db_password}
        except Exception as e:
            return error({"message": str(e), "success": False})
