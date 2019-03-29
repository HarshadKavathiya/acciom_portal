from flask_restful import Resource, reqparse

from application.common.Response import success
from application.helper.connection_check import connection_check


class CheckConnection(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('type',
                            help='This field cannot be blank',
                            required=True)
        parser.add_argument('hostname',
                            help='This field cannot be blank',
                            required=True)
        parser.add_argument('username',
                            help='This field cannot be blank',
                            required=True)
        parser.add_argument('password',
                            help='This field cannot be blank',
                            required=True)
        parser.add_argument('name',
                            help='This field cannot be blank',
                            required=True)

        data = parser.parse_args()
        result = connection_check(data['type'], data['hostname'], data['username'], data['password'],
                                  data['name'])
        if result == success:
            return success(
                {'message': 'connection created',
                 'success': True})
        else:
            return {"message": "connection could not be created", "success": False}
