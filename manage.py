from flask_migrate import Migrate

from application.routes import app
from index import db

migrate = Migrate(app, db)
