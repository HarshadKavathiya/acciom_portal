import datetime

from passlib.hash import pbkdf2_sha256 as sha256

from index import db


class User(db.Model):
    __tablename__ = 'user'
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(280), nullable=False)
    created = db.Column(db.DateTime, default=datetime.datetime.now)
    dbdetail = db.relationship("DbDetail", back_populates='users', lazy=True)
    suite = db.relationship('TestSuite', back_populates='user', lazy=True)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def __init__(self, email, first_name, last_name, password):
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.password = password

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
    db_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('user.user_id'),
                        nullable=False)
    db_type = db.Column(db.String(80), nullable=False)
    db_name = db.Column(db.String(80), nullable=False)
    db_hostname = db.Column(db.String(80), nullable=False)
    db_username = db.Column(db.String(80), nullable=False)
    db_password = db.Column(db.String(80), nullable=False)
    users = db.relationship('User', back_populates='dbdetail', lazy=True)
    created = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, db_type, db_name, db_hostname,
                 db_username, db_password, user_id):
        self.db_type = db_type
        self.db_name = db_name
        self.db_hostname = db_hostname
        self.db_username = db_username
        self.db_password = db_password
        self.user_id = user_id

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()


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
                'source_log': x.src_execution_log,
                'destination_log': x.des_execution_log,
                'executed_at': str(x.executed_at)[0:19]
            }

        def test_case_to_json(x):
            tables = []
            tables = x.table_src_target.strip(';').split(':')
            return {
                'test_case_id': x.test_case_id,
                'test_name': x.test_name,
                'test_id': x.test_id,
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

        return {'user': list(map(lambda x: test_suite_to_json(x),
                                 TestSuite.query.filter_by(user_id=user_id)))}


class TestCase(db.Model):
    __tablename__ = "test_case"
    test_case_id = db.Column(db.Integer, primary_key=True)
    test_suite_id = db.Column(db.ForeignKey(TestSuite.test_suite_id))
    test_id = db.Column(db.String(80), nullable=True)
    test_status = db.Column(db.Integer, nullable=True)

    test_priority = db.Column(db.String(80), nullable=True)
    test_detail = db.Column(db.Text, nullable=True)
    test_column = db.Column(db.Text, nullable=True)
    table_src_target = db.Column(db.Text, nullable=True)
    test_name = db.Column(db.String(80), nullable=True)

    test_queries = db.Column(db.Text, nullable=True)
    test_expected = db.Column(db.Text, nullable=True)
    test_actual = db.Column(db.Text, nullable=True)
    test_created_by = db.Column(db.String(80), nullable=True)
    test_executed_by = db.Column(db.String(80), nullable=True)
    test_comment = db.Column(db.Text, nullable=True)
    created = db.Column(db.DateTime, default=datetime.datetime.now)
    test_suite = db.relationship(TestSuite,
                                 back_populates='test_case', lazy=True)
    test_case_log = db.relationship("TestCaseLog",
                                    back_populates='test_cases', lazy=True)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def __init__(self, test_suite_id, test_id, test_status,
                 test_priority, test_detail, test_column,
                 table_src_target, test_name,
                 test_queries,
                 test_expected, test_actual,
                 test_created_by, test_executed_by,
                 test_comment):
        self.test_suite_id = test_suite_id
        self.test_id = test_id
        self.test_status = test_status
        self.test_priority = test_priority
        self.test_detail = test_detail
        self.test_column = test_column
        self.table_src_target = table_src_target
        self.test_name = test_name
        self.test_queries = test_queries
        self.test_expected = test_expected
        self.test_actual = test_actual
        self.test_created_by = test_created_by
        self.test_executed_by = test_executed_by
        self.test_comment = test_comment


class TestCaseLog(db.Model):
    __tablename__ = "test_case_log"
    test_case_log_id = db.Column(db.Integer, primary_key=True)
    test_case_id = db.Column(db.ForeignKey(TestCase.test_case_id))
    execution_status = db.Column(db.Integer, nullable=True)
    src_execution_log = db.Column(db.Text, nullable=True)
    des_execution_log = db.Column(db.Text, nullable=True)
    error_log = db.Column(db.String(80), nullable=True)
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
