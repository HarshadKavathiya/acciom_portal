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


def api_response(payload, http_status_code):
    """API Response common method."""
    return payload, http_status_code
