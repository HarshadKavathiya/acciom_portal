"""File to store response codes and common methods."""
STATUS_OK = 200
STATUS_BAD_REQUEST = 400
STATUS_UNAUTHORIZED = 401
STATUS_NOT_FOUND = 404
STATUS_SERVER_ERROR = 500
STATUS_CREATED = 201

# Response should be in following format
# {"success":True, "message":"", "data": {}}


def standard_response(payload):  # Deprecate
    """Depecrated."""
    return payload, STATUS_OK


def success(payload):  # Deprecate
    """Depecrated."""
    return payload, STATUS_OK


def error(error):  # Deprecate
    """Deprecated."""
    payload = error
    return payload, STATUS_SERVER_ERROR


def input_error(error):  # Deprecate
    """Deprecated."""
    return error, STATUS_BAD_REQUEST


def api_response(success, message, http_status_code, data=None):
    """API Response common method."""
    payload = {"success": success, "message": message, "data": data if data else {}}
    return payload, http_status_code
