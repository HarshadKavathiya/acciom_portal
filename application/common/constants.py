"""File to store all constants."""


class APIMessages:
    """Messages to be sent in API Responses."""

    EMPTY_FIELD = "{} field cannot be blank"
    USER_EXISTS = "User with email as {} already exists"
    VERIFY_EMAIL = "Please verify your email address"
    USER_CREATED = "User with email as {} was created"
    INTERNAL_ERROR = "An Internal Server Error has occurred"
    USER_NOT_EXIST = "User with email as {} does not exist"
    INVALID_UID_PWD = "Please enter valid Username and Password"
    VERIFY_USER = "User verification is pending. Please verify through email"
    USER_LOGIN = "Logged in as {}"
    RESET_REQUEST = "Password Reset Request"
    RESET_EMAIL = "Reset Email was sent to your email"
    INVALID_TOKEN = "Invalid Token"
    RESET_PAGE = "Page for Password Reset"
    PASSWORD_CHANGE = "Password was successfully changed"
    USER_VERIFIED = "User Verification is completed"
    INVALID_PASSWORD = "The Old password you have entered is Invalid"
    NEW_TOKEN = "Access Token is generated"


class TimeOuts:
    """Timeouts to be referenced in the code."""

    TWO_FORTY_IN_HOURS = 240
    HUNDRED_IN_DAYS = 100
