import ast
import base64
import datetime
import json
import functools

from Crypto import Random
from Crypto.Cipher import AES
from Crypto.Protocol.KDF import PBKDF2
from flask import current_app
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy.dialects.mysql import LONGTEXT, INTEGER

from index import db, app


BS = 16
pad = lambda s: bytes(s + (BS - len(s) % BS) * chr(BS - len(s) % BS), 'utf-8')
unpad = lambda s: s[0:-ord(s[-1:])]
password1 = 'mypassword'


class User(db.Model):
    __tablename__ = 'user'
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False, index=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(280), nullable=False)
    verified = db.Column(db.Boolean, nullable=False)
    created = db.Column(db.DateTime, default=datetime.datetime.now)
    dbdetail = db.relationship("DbDetail", back_populates='users', lazy=True)
    suite = db.relationship('TestSuite', back_populates='user', lazy=True)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def __init__(self, email, first_name, last_name, password, verified):
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.password = password
        self.verified = verified

    def get_reset_token(self, expires_sec=1800):
        s = Serializer(current_app.config.get('SECRET_KEY'), expires_sec)
        return s.dumps({'user_id': self.user_id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(current_app.config.get('SECRET_KEY'))
        try:
            user_id = s.loads(token)['user_id']
        except Exception as e:
            app.logger.error(e)
            return None
        return User.query.get(user_id)

    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)

    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)

    @classmethod
    def find_by_username(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def return_id(cls, name):
        id = cls.query.filter_by(name=name).first()
        return id

    @classmethod
    def return_all(cls):
        def to_json(x):
            return {
                'username': x.username,
                'password': x.password
            }

        return {'user': list(map(lambda x: to_json(x), User.query.all()))}

    @classmethod
    def delete_all(cls):
        try:
            row_deleted = db.session.query(cls).delete()
            db.session.commit()
            return {'message': ' {}rows deleted'.format(row_deleted)}
            # delete all the users and
            # return number of rows deleted
        except Exception as e:
            return {'message': e}


class RevokedTokenModel(db.Model):
    __tablename__ = 'revoked_tokens'
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(120))

    def add(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = cls.query.filter_by(jti=jti).first()
        return bool(query)


class DbDetail(db.Model):
    __tablename__ = "dbdetail"
    db_id = db.Column(INTEGER(unsigned=True),
                      autoincrement=True,
                      primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('user.user_id'),
                        nullable=False)
    connection_name = db.Column(db.String(80))
    db_type = db.Column(db.String(80), nullable=False)
    db_name = db.Column(db.String(80), nullable=False)
    db_hostname = db.Column(db.String(128), nullable=False)
    db_username = db.Column(db.String(80), nullable=False)
    db_password = db.Column(db.String(256))  #
    users = db.relationship('User', back_populates='dbdetail', lazy=True)
    created = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, connection_name, db_type, db_name, db_hostname,
                 db_username, db_password, user_id):
        self.connection_name = connection_name
        self.db_type = db_type
        self.db_name = db_name
        self.db_hostname = db_hostname
        self.db_username = db_username
        self.db_password = db_password
        self.user_id = user_id

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def get_private_key(password1):
        salt = b"this is a salt"
        kdf = PBKDF2(password1, salt, 64, 1000)
        key = kdf[:32]
        return key

    def encrypt(raw):
        private_key = DbDetail.get_private_key(
            app.config.get('DB_ENCRYPTION_KEY'))
        raw = pad(raw)
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(private_key, AES.MODE_CBC, iv)
        return base64.b64encode(iv + cipher.encrypt(raw))

    def decrypt(enc):
        private_key = DbDetail.get_private_key(
            app.config.get('DB_ENCRYPTION_KEY'))
        enc = base64.b64decode(enc)
        iv = enc[:16]
        cipher = AES.new(private_key, AES.MODE_CBC, iv)
        return unpad(cipher.decrypt(enc[16:]))


class TestSuite(db.Model):
    __tablename__ = "test_suite"
    test_suite_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('user.user_id'), nullable=False)
    excel_name = db.Column(db.String(300), nullable=False)
    test_suite_name = db.Column(db.String(50), nullable=True)
    created = db.Column(db.DateTime, default=datetime.datetime.now)
    test_case = db.relationship("TestCase",
                                back_populates='test_suite', lazy=True)
    user = db.relationship('User', back_populates='suite', lazy=True)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_by_name(cls, excel_name, ):
        return cls.query.filter_by(excel_name=excel_name).first()

    @classmethod
    def return_all(cls, user_id):
        def test_log_to_json(x):
            return {
                'test_case_log_id': x.test_case_log_id,
                'test_case_id': x.test_case_id,
                'test_execution_status': x.execution_status,
                'executed_at': str(x.executed_at)[0:19]
            }

        def db_id_to_json(x):
            return {
                'db_id': x.db_id,
                'db_type': x.db_type
            }

        def test_case_to_json(x):
            tables = []
            a = ast.literal_eval(x.test_case_detail)
            b = a["table"]
            for key in b:
                tables.append(key)
                tables.append(b[key])
            return {
                'test_suite_id': x.test_suite_id,
                'test_case_id': x.test_case_id,
                'test_name': x.test_name,
                'test_id': x.test_id,
                'src_db_id': list(map(lambda x: db_id_to_json(x),
                                      DbDetail.query.
                                      filter_by(db_id=x.src_db_id))),
                'target_db_id': x.target_db_id,
                'target_db_idd': x.src_db_id,
                'test_status': x.test_status,
                'table_src': str(tables[0]),
                'table_target': str(tables[1]),
                'test_case_log': list(map(lambda each_case:
                                          test_log_to_json(each_case),
                                          x.test_case_log))
            }

        def test_suite_to_json(x):
            return {
                'test_suite_id': x.test_suite_id,
                'excel_name': x.excel_name,
                'test_suite_name': x.test_suite_name,
                'created': str(x.created)[0:19],
                'test_case_list': list(map(lambda each_case:
                                           test_case_to_json(each_case),
                                           x.test_case))
            }

        # db.session.commit()
        return {'user': list(map(lambda x: test_suite_to_json(x),
                                 TestSuite.query.filter_by(user_id=user_id)))}


class TestCase(db.Model):
    __tablename__ = "test_case"
    test_case_id = db.Column(db.Integer, primary_key=True)
    test_suite_id = db.Column(db.ForeignKey(TestSuite.test_suite_id))
    test_id = db.Column(db.String(80), nullable=True)
    test_status = db.Column(db.Integer, nullable=True)
    test_case_detail = db.Column(LONGTEXT, nullable=True)
    test_name = db.Column(db.String(80), nullable=True)
    src_db_id = db.Column(db.ForeignKey('dbdetail.db_id'))
    target_db_id = db.Column(db.ForeignKey('dbdetail.db_id'))
    created = db.Column(db.DateTime, default=datetime.datetime.now)

    test_suite = db.relationship(TestSuite,
                                 back_populates='test_case', lazy=True)
    test_case_log = db.relationship("TestCaseLog",
                                    back_populates='test_cases', lazy=True)
    src_db = db.relationship("DbDetail", foreign_keys=[src_db_id])
    target_db = db.relationship("DbDetail", foreign_keys=[target_db_id])

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def __init__(self, test_suite_id, test_id, test_status,
                 test_case_detail,
                 test_name,
                 src_db_id, target_db_id):
        self.test_suite_id = test_suite_id
        self.test_id = test_id
        self.test_status = test_status
        self.test_name = test_name
        self.test_case_detail = test_case_detail
        self.src_db_id = src_db_id
        self.target_db_id = target_db_id


class TestCaseLog(db.Model):
    __tablename__ = "test_case_log"
    test_case_log_id = db.Column(db.Integer, primary_key=True)
    test_case_id = db.Column(db.ForeignKey(TestCase.test_case_id))
    execution_status = db.Column(db.Integer, nullable=True)
    src_execution_log = db.Column(LONGTEXT, nullable=True)
    des_execution_log = db.Column(LONGTEXT, nullable=True)
    error_log = db.Column(LONGTEXT, nullable=True)
    test_cases = db.relationship(TestCase,
                                 back_populates='test_case_log', lazy=True)
    spark_job = db.relationship("SparkJob", back_populates='test_cases_log',
                                lazy=True)
    executed_at = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, test_case_id, execution_status,
                 src_execution_log, des_execution_log, error_log):
        self.test_case_id = test_case_id
        self.execution_status = execution_status
        self.src_execution_log = src_execution_log
        self.des_execution_log = des_execution_log
        self.error_log = error_log

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def return_all_log(cls, test_case_log_id):
        dest_count = 0
        def test_case_log_json(x):
            if (x.execution_status == 1):

                if x.test_cases.test_name == 'Datavalidation':
                    src = ast.literal_eval(x.src_execution_log)
                    if src['result'] == 'none':
                        src_pass = {'res': src['result'],
                                    'src_count': src['src_count'],
                                    'src_to_dest_count': src[
                                        'src_to_dest_count']}
                    else:
                        src_dict = json.loads(src['result'])
                        src_pass = {'res': src_dict[:10],
                                    'src_count': src['src_count'],
                                    'src_to_dest_count': src[
                                        'src_to_dest_count']}

                    dest = ast.literal_eval(x.des_execution_log)
                    if dest['result'] == 'none':
                        dest_pass = {'res': dest['result'],
                                     'dest_count': dest['tar_count'],
                                     'dest_to_src_count': dest[
                                         'dest_to_src_count']}
                    else:
                        des_dict = json.loads(dest['result'])
                        dest_pass = {'res': des_dict[:10],
                                     'dest_count': dest['tar_count'],
                                     'dest_to_src_count': dest[
                                         'dest_to_src_count']}
                    dest = dest_pass
                    src = src_pass
                else:
                    dest = x.des_execution_log
                    src = x.src_execution_log
            else:
                dest_count = 0
                sum_of_duplicate_records = 0
                if x.test_cases.test_name == 'NullCheck' or \
                        x.test_cases.test_name == 'DuplicateCheck':
                    sum_of_duplicate_records = 0
                    dest1 = json.loads(x.des_execution_log)
                    dest_count = int(len(dest1) -1)
                    dest = dest1[:current_app.config.get('TARGET_RECORD_COUNT_NULL_DUPLICATE')]
                    src = x.src_execution_log
                    if x.test_cases.test_name =='DuplicateCheck':
                        sum_of_duplicate_records = functools.reduce(lambda  x,y : x+y ,[int(i[-1]) for i in dest1[1:]])
                elif x.test_cases.test_name == 'Datavalidation':
                    if x.src_execution_log == 'none':
                        src = 'none'
                    else:
                        src = ast.literal_eval(x.src_execution_log)
                        if src['result'] == 'none':
                            src = {'res': src['result'],
                                   'src_count': src['src_count'],
                                   'src_to_dest_count': src[
                                       'src_to_dest_count']}
                        else:
                            src_dict = json.loads(src['result'])
                            src = {'res': src_dict[:10],
                                   'src_count': src['src_count'],
                                   'src_to_dest_count': src[
                                       'src_to_dest_count']}
                    if x.des_execution_log == 'none':
                        dest = 'none'
                    else:
                        dest = ast.literal_eval(x.des_execution_log)
                        if dest['result'] == 'none':
                            dest = {'res': dest['result'],
                                    'dest_count': dest['tar_count'],
                                    'dest_to_src_count': dest[
                                        'dest_to_src_count']}
                        else:
                            des_dict = json.loads(dest['result'])
                            dest = {'res': des_dict[:10],
                                    'dest_count': dest['tar_count'],
                                    'dest_to_src_count': dest[
                                        'dest_to_src_count']}
                else:

                    dest = x.des_execution_log
                    src = x.src_execution_log
            return {
                'test_case_log_id': x.test_case_log_id,
                'test_case_id': x.test_case_id,
                'test_execution_status': x.execution_status,
                'source_log': src,
                'destination_log': dest,
                'destination_count':dest_count,
                'Duplicate_counts': sum_of_duplicate_records,
            }

        return {"data": test_case_log_json(TestCaseLog.query.filter_by(
            test_case_log_id=test_case_log_id
        ).first())}


class SparkJob(db.Model):
    __tablename__ = "sparkjob"
    spark_job_id = db.Column(db.Integer, primary_key=True)
    test_case_log_id = db.Column(db.ForeignKey(TestCaseLog.test_case_log_id))
    job_id = db.Column(db.Integer, nullable=True)
    status = db.Column(db.String(80), nullable=True)
    test_cases_log = db.relationship(TestCaseLog, back_populates='spark_job',
                                     lazy=True)
    created = db.Column(db.DateTime, default=datetime.datetime.now)
    modified = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, job_id=None, status=None):
        self.job_id = job_id
        self.status = status

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
