"""File to handle Login feature."""
import datetime
from flasgger import swag_from
from flask import render_template
from flask_jwt_extended import (create_access_token, jwt_required, get_raw_jwt, get_jwt_identity)
from flask_mail import Message, Mail
from flask_restful import Resource, reqparse
from sqlalchemy.exc import SQLAlchemyError
from application.common.response import api_response, STATUS_BAD_REQUEST, STATUS_SERVER_ERROR, STATUS_CREATED, STATUS_OK
from application.common.exception import InvalidInput
from application.models.user import User, RevokedTokenModel
from index import app, db
from application.common.constants import APIMessages, TimeOuts

mail = Mail(app)


class Register(Resource):
    """Register Class."""

    @swag_from('/application/apidocs/register.yml')
    def post(self):
        """Post method."""
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('email', help='This field cannot be blank and ', required=True, type=str)
        parser.add_argument('first_name', help='This field cannot be blank', required=True, type=str)
        parser.add_argument('last_name', help='This field cannot be blank', required=True, type=str)
        parser.add_argument('password', help='This field cannot be blank', required=True, type=str)
        data = parser.parse_args(strict=True)
        try:

            list_of_args = [arg.name for arg in parser.args]
            # Checking if fields are empty
            request_data_validation = validate_empty_fields(data, list_of_args)
            if request_data_validation:
                print(request_data_validation)
                return api_response(success=False, message=request_data_validation,
                                    http_status_code=STATUS_BAD_REQUEST, data={})
            if User.find_by_username(data['email']):
                raise InvalidInput(APIMessages.USER_EXISTS.format(data['email']))
            new_user = User(email=data['email'], first_name=data['first_name'], last_name=data['last_name'],
                            password=User.generate_hash(data['password']), verified=False)
            new_user.save_to_db()
            send_mail_to_verify(new_user)
            return api_response(True, APIMessages.USER_CREATED.format(new_user.email), STATUS_CREATED)
        except SQLAlchemyError as e:
            db.session.rollback()
            return api_response(False, APIMessages.INTERNAL_ERROR, STATUS_SERVER_ERROR, {'error_log': str(e)})
        except InvalidInput as e:
            return api_response(False, str(e), STATUS_BAD_REQUEST)
        except Exception as e:
            return api_response(False, APIMessages.INTERNAL_ERROR, STATUS_SERVER_ERROR, {'error_log': str(e)})


class Login(Resource):
    """Login."""

    @swag_from('/application/apidocs/login.yml')
    def post(self):
        """Post call."""
        parser = reqparse.RequestParser()
        parser.add_argument('email', help='This field cannot be blank', required=True)
        parser.add_argument('password', help='This field cannot be blank', required=True)
        data = parser.parse_args()
        try:
            list_of_args = [arg.name for arg in parser.args]
            request_data_validation = validate_empty_fields(data, list_of_args)
            if request_data_validation:
                return api_response(False, request_data_validation, STATUS_BAD_REQUEST)
            current_user = User.query.filter_by(email=data['email']).first()
            expires = datetime.timedelta(hours=TimeOuts.TEN_DAYS_IN_HOURS)
            # TODO: MORE COMPLEX USER OBJECT  TOKEN CREATION.
            # TODO: , expires_delta=expires
            if not current_user:
                raise InvalidInput(APIMessages.USER_NOT_EXIST.format(data['email']))
            if User.verify_hash(data['password'], current_user.password):
                if not current_user.verified:
                    send_mail_to_verify(current_user)
                    raise InvalidInput(APIMessages.VERIFY_USER)
                else:
                    access_token = create_access_token(identity=current_user.user_id, expires_delta=expires)
            else:
                raise InvalidInput(APIMessages.INVALID_UID_PWD.format(data['email']))
        except InvalidInput as e:
            return api_response(False, str(e), STATUS_BAD_REQUEST)
        except Exception as e:
            return api_response(False, APIMessages.INTERNAL_ERROR, STATUS_SERVER_ERROR, {'error_log': str(e)})
        return api_response(True, APIMessages.USER_LOGIN.format(current_user.email), STATUS_OK,
                            {'user_id': current_user.user_id, 'access_token': access_token,
                             'user_email': current_user.email, 'user_name': current_user.first_name})


class Logout(Resource):  # Need to be revamped. Currently, not working
    """Logout."""

    @jwt_required
    def post(self):
        """Post call."""
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti=jti)
            revoked_token.add()
            # TODO: Logout method needs to be revamped after finalizing Auth module
            return {'message': 'access_token has been revoked'}
        except Exception as e:
            return {'message': e}


class ResetPasswordEmail(Resource):
    """Reset Password Email."""

    @swag_from('/application/apidocs/resetpasswordemail.yml')
    def post(self):  # api/reset-password-email
        """Post call."""
        parser = reqparse.RequestParser()
        parser.add_argument('email', help='This field cannot be blank', required=True)
        data = parser.parse_args()
        try:
            list_of_args = [arg.name for arg in parser.args]
            request_data_validation = validate_empty_fields(data, list_of_args)
            if request_data_validation:
                return api_response(False, request_data_validation, STATUS_BAD_REQUEST)
            user = User.query.filter_by(email=data['email']).first()
            if user is None:
                return api_response(False, APIMessages.USER_NOT_EXIST.format(data['email']), STATUS_BAD_REQUEST)
            else:
                send_reset_email(user)
                return api_response(True, APIMessages.RESET_EMAIL, STATUS_OK)
        except Exception as e:
            return api_response(False, APIMessages.INTERNAL_ERROR, STATUS_SERVER_ERROR, {"error_log": str(e)})


class ResetPassword(Resource):
    """Reset Password."""

    def get(self, token):
        """Get call."""
        try:
            user = User.verify_reset_token(token)
            if user is None:
                return api_response(False, APIMessages.INVALID_TOKEN, STATUS_BAD_REQUEST)
            else:
                return api_response(True, APIMessages.RESET_PAGE, STATUS_OK, {"token": token})
        except Exception as e:
            return api_response(False, APIMessages.INTERNAL_ERROR, STATUS_SERVER_ERROR, {"error_log": str(e)})


class ResetPasswordInput(Resource):
    """Reset Password."""

    def post(self):
        """Post Call."""
        parser = reqparse.RequestParser()
        parser.add_argument('password', help='This field cannot be blank', required=True)
        parser.add_argument('confirm_password', help='field is required', required=True)
        parser.add_argument('token', help='filed is required', required=True)
        data = parser.parse_args()
        try:
            list_of_args = [arg.name for arg in parser.args]
            request_data_validation = validate_empty_fields(data, list_of_args)
            if request_data_validation:
                return api_response(False, request_data_validation, STATUS_BAD_REQUEST)
            user = User.verify_reset_token(data['token'])
            if user is None:
                return api_response(False, APIMessages.INVALID_TOKEN, STATUS_BAD_REQUEST)
            else:
                password = User.generate_hash(data['password'])
                user.password = password
                db.session.commit()
                return api_response(True, APIMessages.PASSWORD_CHANGE, STATUS_CREATED)
        except Exception as e:
            return api_response(False, APIMessages.INTERNAL_ERROR, STATUS_SERVER_ERROR, {"error_log": str(e)})


class SettingNewPassword(Resource):
    """Set New Password."""

    @jwt_required
    @swag_from('/application/apidocs/settingnewpassword.yml')
    def post(self):
        """Post call."""
        parser = reqparse.RequestParser()
        parser.add_argument('old_password', help='This field cannot be blank', required=True)
        parser.add_argument('new_password', help='This field cannot be blank', required=True)
        data = parser.parse_args()
        try:
            list_of_args = [arg.name for arg in parser.args]
            request_data_validation = validate_empty_fields(data, list_of_args)
            if request_data_validation:
                return api_response(False, request_data_validation, STATUS_BAD_REQUEST)
            current_user_id = get_jwt_identity()
            current_user = db.session.query(User).get(current_user_id)
            if not User.verify_hash(data['old_password'], current_user.password):
                return api_response(False, APIMessages.INVALID_PASSWORD, STATUS_BAD_REQUEST)
            current_user.password = current_user.generate_hash(data['new_password'])
            current_user.save_to_db()
            return api_response(True, APIMessages.PASSWORD_CHANGE, STATUS_CREATED)
        except Exception as e:
            return api_response(False, APIMessages.INTERNAL_ERROR, STATUS_SERVER_ERROR, {"error_log": str(e)})


class VerifyAccount(Resource):
    """Verify Account."""

    @swag_from('/application/apidocs/verify.yml')
    def get(self, token):
        """Get call."""
        try:
            user = User.verify_reset_token(token)
            if user is None:
                return api_response(False, APIMessages.INVALID_TOKEN, STATUS_BAD_REQUEST)
            else:
                user.verified = True
                db.session.commit()
                return api_response(True, APIMessages.USER_VERIFIED, STATUS_OK, {"token": token})
        except Exception as e:
            return api_response(False, APIMessages.INTERNAL_ERROR, STATUS_SERVER_ERROR, {"error_log": str(e)})


class GetToken(Resource):
    """Get Token."""

    @jwt_required
    def get(self):
        """Get call."""
        try:
            expires = datetime.timedelta(days=TimeOuts.HUNDRED_DAYS)
            current_user_id = get_jwt_identity()
            current_user = db.session.query(User).get(current_user_id)
            # TODO: Security for the token.
            access_token = create_access_token(
                identity=current_user.user_id,
                expires_delta=expires)
            return api_response(True, APIMessages.NEW_TOKEN, STATUS_OK, {'access_token': access_token})
        except Exception as e:
            return api_response(False, APIMessages.INTERNAL_ERROR, STATUS_SERVER_ERROR, {'error_log': str(e)})


def validate_empty_fields(data_json, list_of_args):
    """Validate empty fields on request payload."""
    for each_arg in list_of_args:
        if not (data_json[each_arg] and data_json[each_arg].strip()):
            # Checking if fields are empty
            return APIMessages.EMPTY_FIELD.format(each_arg)


def send_reset_email(user):
    """Send reset email."""
    token = user.get_reset_token()
    msg = Message(APIMessages.RESET_REQUEST, sender=("Acciom", app.config.get('MAIL_USERNAME')),
                  recipients=[user.email])
    msg_link = str(app.config.get('API_END_POINT') + app.config.get('UI_RESET_PASSWORD_PATH') + token)
    msg.html = render_template("email_reset_password.html", links=msg_link, name=user.first_name, email=user.email,
                               emailnoreplay='<noreplay@accionlabs.com>')
    # api.url_for(ResetPassword, token=token, _external=True)
    mail.send(msg)


def send_mail_to_verify(user):
    """Send verification email."""
    token = user.get_reset_token()
    msg = Message(APIMessages.VERIFY_EMAIL, sender=("Acciom", app.config.get('MAIL_USERNAME')),
                  recipients=[user.email])
    msg_link = str(app.config.get('API_END_POINT') + app.config.get('UI_AFTER_VERIFY') + token)
    msg.html = render_template("email_verify.html", links=msg_link, name=user.first_name, email=user.email)
    mail.send(msg)
