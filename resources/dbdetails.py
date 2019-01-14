from flask_restful import Resource, reqparse
from models.user import DbDetail
from flask_jwt_extended import (jwt_required, get_jwt_identity)


parser = reqparse.RequestParser()
parser.add_argument('type', help='this is required', required=True)
parser.add_argument('name', help='this is required', required=True)
parser.add_argument('hostname', help='this cannot be empty', required=True)
parser.add_argument('username', help='this is required', required=True)
parser.add_argument('password', help='this is required', required=True)


class DbDetails(Resource):
    @jwt_required
    def post(self):
        data = parser.parse_args()
        current_user = get_jwt_identity()
        print(current_user)

        new_db = DbDetail(
            user_id=current_user,
            db_type=data['type'],
            db_name=data['name'],
            db_hostname=data['hostname'],
            db_username=data['username'],
            db_password=data['password'],

        )

        new_db.save_to_db()
        try:
            return{
                "message": "data saved",
                "Success": True
            }, 200
        except Exception as e:
            return{"message": e}, 400
