from celery import Celery
from flask import Flask

from application.utils import run_by_case_id
from index import db


def make_celery(app):
    celery = Celery(app.import_name,
                    backend=app.config['CELERY_RESULT_BACKEND'],
                    broker=app.config['CELERY_BROKER_URL'])
    celery.conf.update(app.config)
    TaskBase = celery.Task

    class ContextTask(TaskBase):
        abstract = True

        def __call__(self, *args, **kwargs):
            with app.app_context():
                return TaskBase.__call__(self, *args, **kwargs)

    celery.Task = ContextTask
    return celery


flask_app = Flask(__name__)
flask_app.config[
    'SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://Acciom_user:Acciomuser' \
                                 '@localhost/Acciom_tool'
flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
flask_app.secret_key = 'EiEiO'
flask_app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
flask_app.config['JWT_BLACKLIST_ENABLED'] = True
flask_app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

flask_app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379'
flask_app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379'
db.init_app(flask_app)
celery = make_celery(flask_app)


@celery.task()
def my_background_task(x):
    print("celery is working")
    run_by_case_id(x)
    print("completed Celery")
    # return run_ans
