
STATUS_OK = 200
STATUS_BAD_REQUEST = 400
STATUS_UNAUTHORIZED = 401
STATUS_NOT_FOUND = 404
STATUS_SERVER_ERROR = 500

def standard_response(payload):

    return payload,STATUS_OK

def success(payload):

    return payload, STATUS_OK


def error(error):
    payload = error
    return payload, STATUS_SERVER_ERROR

def input_error(error):
    return error, STATUS_BAD_REQUEST


