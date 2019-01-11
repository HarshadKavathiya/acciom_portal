from flask_restful import Resource, reqparse
import datetime
from sqlalchemy.exc import SQLAlchemyError
from db import db
from models.user import User, RevokedTokenModel
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)

parser = reqparse.RequestParser()
parser.add_argument('email', help='This field cannot be blank', required=True)
parser.add_argument('first_name', help='This field cannot be blank', required=False)
parser.add_argument('last_name', help='This field cannot be blank', required=False)
parser.add_argument('password', help='This field cannot be blank', required=True)


class UserRegistration(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('email', help='This field cannot be blank', required=True)
    parser.add_argument('first_name', help='This field cannot be blank', required=True)
    parser.add_argument('last_name', help='This field cannot be blank', required=True)
    parser.add_argument('password', help='This field cannot be blank', required=True)

    def post(self):
        data = parser.parse_args()
        print(data)
        if User.find_by_username(data['email']):
            return {'message': "User {} already exists".format(data['email'])}
        new_user = User(
            email=data['email'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            password=User.generate_hash(data['password'])
        )
        try:
            new_user.save_to_db()
            return {
                'message': 'user {} was created'.format(data['email']),
                'success': True
            }
        except SQLAlchemyError as e:
            db.session.rollback()
            print("errors", e)

            return {'message': 'something went wrong'}, 500


class UserLogin(Resource):

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', help='This field cannot be blank', required=True)
        parser.add_argument('password', help='This field cannot be blank', required=True)

        data = parser.parse_args()
        current_user = User.query.filter_by(email=data['email']).first()
        # current_user = User.find_by_username(data['username'])
        print(current_user.user_id)
        # print(data)
        expires = datetime.timedelta(hours=24)
        # userobject=User(id=current_user.id,username=current_user.username)
        # TODO: MORE COMPLEX USER OBJECT  TOKEN CREATION.
        # TODO: , expires_delta=expires
        if not current_user:
            return {'response': 'user does not exists'}
        if User.verify_hash(data['password'], current_user.password):
            access_token = create_access_token(identity=current_user.user_id, expires_delta=expires),
            refresh_token = create_refresh_token(identity=current_user.user_id)
            return {'message': 'logged in as {} '.format(current_user.email),
                    'uid': current_user.user_id,
                    'access_token': access_token,
                    # 'refresh_token': refresh_token,
                    # 'expires_time': str(expires),
                    'success': True,
                    'user': current_user.email,
                    'name': current_user.first_name}
        else:
            return {'message': 'Wrong credentials'}


class UserLogoutAccess(Resource):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti=jti)
            revoked_token.add()
            return {'message': 'access_token has been revoked'}
        except:
            return {'message': 'something went wrong'}


class UserLogoutRefresh(Resource):
    def post(self):
        return {'message': 'user logout success'}


class AllUser(Resource):
    @jwt_required
    def get(self):
        try:
            return User.return_all()
        except:
            {'message': 'something went wrong'}

    def delete(self):
        return User.delete_all()


class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def get(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user)
        return {'access_token': access_token}
