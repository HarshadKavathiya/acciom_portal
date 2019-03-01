import datetime

from flask_jwt_extended import (create_access_token,
                                jwt_required,
                                get_raw_jwt)
from flask_restful import Resource, reqparse
from sqlalchemy.exc import SQLAlchemyError

from application.common.Response import error, success, input_error
from application.common.exception import InvalidInput
from application.models.user import User, RevokedTokenModel
from index import db

parser = reqparse.RequestParser()
parser.add_argument('email',
                    help='This field cannot be blank',
                    required=True)
parser.add_argument('first_name',
                    help='This field cannot be blank',
                    required=False)
parser.add_argument('last_name',
                    help='This field cannot be blank',
                    required=False)
parser.add_argument('password',
                    help='This field cannot be blank',
                    required=True)


class Register(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('email',
                        help='This field cannot be blank',
                        required=True)
    parser.add_argument('first_name',
                        help='This field cannot be blank',
                        required=True)
    parser.add_argument('last_name',
                        help='This field cannot be blank',
                        required=True)
    parser.add_argument('password',
                        help='This field cannot be blank',
                        required=True)

    def post(self):
        try:
            data = parser.parse_args()
            print(data)
            if User.find_by_username(data['email']):
                raise InvalidInput(
                    "User {} already exists".format(data['email']))
            new_user = User(
                email=data['email'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                password=User.generate_hash(data['password'])
            )
            new_user.save_to_db()
            return success(
                {'message': 'user {} was created'.format(data['email']),
                 'success': True})

        except SQLAlchemyError as e:
            db.session.rollback()
            print("errors", e)
            return error({"success": False, 'message': str(e)})

        except InvalidInput as e:
            return error({"success": False, "message": str(e)})


class Login(Resource):

    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('email',
                                help='This field cannot be blank',
                                required=True)
            parser.add_argument('password',
                                help='This field cannot be blank',
                                required=True)

            data = parser.parse_args()
            current_user = User.query.filter_by(email=data['email']).first()
            expires = datetime.timedelta(hours=24)
            # userobject=User(id=current_user.id,username=current_user.username)
            # TODO: MORE COMPLEX USER OBJECT  TOKEN CREATION.
            # TODO: , expires_delta=expires
            if not current_user:
                raise InvalidInput(
                    "User {} does not exists".format(data['email']))
            if User.verify_hash(data['password'], current_user.password):
                access_token = create_access_token(
                    identity=current_user.user_id,
                    expires_delta=expires)
                payload = {
                    'message': 'logged in as {} '.format(current_user.email),
                    'uid': current_user.user_id,
                    'access_token': access_token,
                    'success': True,
                    'user': current_user.email,
                    'name': current_user.first_name}
            else:
                raise InvalidInput(
                    "Credentials Does Not Match".format(data['email']))

        except InvalidInput as e:
            return input_error({"success": False, "message": str(e)})
        return success(payload)


class Logout(Resource):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti=jti)
            revoked_token.add()
            return {'message': 'access_token has been revoked'}
        except Exception as e:
            return {'message': e}
