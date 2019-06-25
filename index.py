import logging
import os
from logging.handlers import RotatingFileHandler

from flasgger import Swagger
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

levels = {"DEBUG": logging.DEBUG,
          "INFO": logging.INFO,
          "ERROR": logging.ERROR,
          "WARNING": logging.WARNING}


def config_log(app):
    # Create Logs directory if not exist
    log_directory = app.config['LOG_LOCATION']
    if not os.path.exists(log_directory):
        os.makedirs(log_directory)

    log_file_location = log_directory + "/acciom.log"
    handler = RotatingFileHandler(log_file_location,
                                  maxBytes=10000,
                                  backupCount=1)
    handler.setFormatter(logging.Formatter(app.config['LOG_FORMAT']))
    app.logger.addHandler(handler)
    app.logger.setLevel(app.config['LOG_LEVEL'])


def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config.cfg')
    config_log(app)
    return app


basedir = os.path.abspath(os.path.dirname(__file__))
static_folder = basedir + '/static/acciom_ui/'

app = create_app()
app.url_map.strict_slashes = False
db = SQLAlchemy(app)
jwt = JWTManager(app)
api = Api(app)
CORS(app)
mail = Mail(app)

swagger_template = {'securityDefinitions': {'basicAuth': {'type': 'basic'}}}
swagger_config = {"title": "Acciom Portal",
                  "jquery_js": "",
                  "headers": [],
                  "specs": [{"endpoint": 'api',
                             "route": '/specifications.json',
                             }
                            ],
                  "specs_route": "/",
                  "url_prefix": "/api"
                  }
swagger = Swagger(app, config=swagger_config, template=swagger_template)
