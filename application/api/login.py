import datetime

from flask_jwt_extended import (create_access_token,
                                jwt_required,
                                get_raw_jwt, get_jwt_identity)
from flask_mail import Message, Mail
from flask_restful import Resource, reqparse
from sqlalchemy.exc import SQLAlchemyError

from application.common.Response import error, success, input_error
from application.common.exception import InvalidInput
from application.models.user import User, RevokedTokenModel
from index import app
from index import db

mail = Mail(app)
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
            if User.find_by_username(data['email']):
                raise InvalidInput(
                    "User {} already exists".format(data['email']))
            new_user = User(
                email=data['email'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                password=User.generate_hash(data['password']),
                verified=False
            )
            new_user.save_to_db()
            send_mail_to_verify(new_user)
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
            expires = datetime.timedelta(hours=240)
            # userobject=User(id=current_user.id,username=current_user.username)
            # TODO: MORE COMPLEX USER OBJECT  TOKEN CREATION.
            # TODO: , expires_delta=expires
            if not current_user:
                raise InvalidInput(
                    "User {} does not exists".format(data['email']))
            if User.verify_hash(data['password'], current_user.password):
                if not (verify_user(current_user.email)):
                    send_mail_to_verify(current_user)
                    raise InvalidInput("Verify User")
                else:
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


class ResetPasswordEmail(Resource):
    def post(self):  # api/resetpassword
        parser = reqparse.RequestParser()
        parser.add_argument('email',
                            help='This field cannot be blank',
                            required=True)
        data = parser.parse_args()
        print("email", data['email'])
        user = User.query.filter_by(email=data['email']).first()
        if user is None:
            print("user not present")
            return error({"success": False, "message": "Your e-mail Id is not correct"})

        else:
            print("email is ok")
            send_reset_email(user)
            payload = {"success": True, "message": "mail sent to your email"}
        return success(payload)


class ResetPassword(Resource):  # /api/resetpassword/token
    def get(self, token):
        user = User.verify_reset_token(token)
        if user is None:
            return error({"success": False, "message": "Invalid token"})
        else:
            return success({"message": "page for passwordreset", "success": True,
                            "token": token})


class ResetPasswordInput(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('password',
                            help='This field cannot be blank',
                            required=True)
        parser.add_argument('confirm_password', help='field is required', required=True)
        parser.add_argument('token', help='filed is required', required=True)
        data = parser.parse_args()
        print(data['password'], data['confirm_password'], data['token'])
        user = User.verify_reset_token(data['token'])
        if user is None:
            return error({"success": False, "message": "Invalid token"})
        else:
            password = User.generate_hash(data['password'])
            user.password = password
            db.session.commit()
            return success({"message": "Password changed", "success": True})


def send_reset_email(user):
    token = user.get_reset_token()
    msg = Message('Password Reset Request', sender="bhardwaj.akhil96@gmail.com", recipients=[user.email])
    msg.body = 'http://0.0.0.0:5000' + app.config.get('UI_RESET_PASSWORD_PATH') + token
    # api.url_for(ResetPassword, token=token, _external=True)
    mail.send(msg)


class SettingNewPaswword(Resource):
    @jwt_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('old_password',
                            help='This field cannot be blank',
                            required=True)
        parser.add_argument('new_password',
                            help='This field cannot be blank',
                            required=True)

        data = parser.parse_args()
        current_user_id = get_jwt_identity()
        current_user = db.session.query(User).get(current_user_id)
        if not User.verify_hash(data['old_password'], current_user.password):
            return error({"success": False, "message": "invalid password"})
        current_user.password = current_user.generate_hash(data['new_password'])
        current_user.save_to_db()
        return success(
            {'message': 'password changed successfully',
             'success': True})


def verify_user(email):
    current_user = User.query.filter_by(email=email).first()
    if not (current_user.verified):
        return False
    else:
        return True


def send_mail_to_verify(user):
    token = user.get_reset_token()
    msg = Message('verify User Request', sender="bhardwaj.akhil96@gmail.com", recipients=[user.email])
    msg.body = 'http://0.0.0.0:5000' + app.config.get('UI_AFTER_VERIFY') + token
    mail.send(msg)


class VerifyAccount(Resource):
    def get(self, token):
        user = User.verify_reset_token(token)
        if user is None:
            return error({"success": False, "message": "Invalid token"})
        else:
            print(user.verified)
            print(user.email)
            user.verified = True
            db.session.commit()
            return success({"message": "User is Verified", "success": True,
                            "token": token})
