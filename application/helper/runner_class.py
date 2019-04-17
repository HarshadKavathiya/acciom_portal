import ast

from flask import current_app as app

from application.common.dbconnect import source_db, dest_db
from application.helper.countcheck import count_check
from application.helper.datavalidation import datavalidation
from application.helper.ddlcheck import ddl_check
from application.helper.duplication import duplication
from application.helper.nullcheck import null_check
from application.models.user import DbDetail
from application.models.user import SparkJob, TestCaseLog, TestCase


def split_table(table_name):
    """
    :param table_name: gets table_src_target value stored in TestSuite table
    :return: returns a list consist of source and destination db.
    """
    table_names = ast.literal_eval(table_name)
    lst1 = {}
    tables = table_names["table"]
    for key in tables:
        lst1['src_table'] = key
        lst1['target_table'] = tables[key]
    return lst1


def save_case_log(test_case_id, execution_status,
                  src_execution_log,
                  des_execution_log,
                  error_log):
    temp = TestCaseLog(test_case_id=test_case_id,
                       execution_status=execution_status,
                       src_execution_log=src_execution_log,
                       des_execution_log=des_execution_log,
                       error_log=error_log)
    temp.save_to_db()
    return temp


def save_test_status(test_case_id, status):
    """
    :param test_case_id : utils case object.
    :param status: test_status of Testcase object
    :return: just store value in db.
    """
    test_case_id.test_status = status
    test_case_id.save_to_db()
    return True


def split_query(qry):
    res = {}
    split_qry = qry.split(';')
    new_list = [i.split(':') for i in split_qry]
    res['src_qry'] = new_list[0][1]
    res['target_qry'] = new_list[1][1]
    return


def get_query(quires):
    q = ast.literal_eval(quires)
    query = q["query"]
    return query


def get_column(columns):
    '''
    :param columns:
    :return: list of target columns only as a list used in case of nullcheck
    and duplicate check
    '''
    c = ast.literal_eval(columns)
    column = c["column"]
    column = list(column.values())
    return column


def db_details(db_id):
    db_list = {}
    """
    :return: returns the db_type,db_name,db_username,
    db_hostname,db_password based on
    db_id (foreign Key)
    """
    db_obj = DbDetail.query.filter_by(db_id=db_id).first()
    x = db_obj.db_password.encode()
    decrypted = DbDetail.decrypt(x)
    newpassword = bytes.decode(decrypted)
    db_list['db_id'] = db_obj.db_id
    db_list['db_type'] = db_obj.db_type
    db_list['db_name'] = db_obj.db_name
    db_list['db_hostname'] = db_obj.db_hostname
    db_list['db_username'] = db_obj.db_username
    db_list['db_password'] = newpassword
    return db_list


def split_db(test_db_detail):
    lst1 = []
    lst2 = []
    strip_db_detail = test_db_detail.split(";")
    for i in range(len(strip_db_detail)):
        lst1.append(strip_db_detail[i].split(':', 1))
    lst2.append(lst1[2][1])
    lst2.append(lst1[5][1])
    lst2.append(lst1[0][1])
    lst2.append(lst1[4][1])
    lst2.append(lst1[1][1])
    lst2.append(lst1[6][1])
    lst2.append(lst1[3][1])
    lst2.append(lst1[7][1])
    return lst2


def run_by_case_id(test_case_id):
    """
    :param test_case_id: recieves case_id to be tested.
    :return: just run the utils case.
    """
    test_case = TestCase.query.filter_by(test_case_id=test_case_id).first()
    run_test(test_case)
    return True


def run_test(case_id):
    """
    :param case_id: case_id is test_case_id
    :return: it does the utils on test_case_id based on  its test_name
    """
    save_test_status(case_id, 3)
    case_log = save_case_log(case_id.test_case_id, None, None, None, None)

    if case_id.test_status == 3:
        if case_id.test_name == 'CountCheck':  # 1st Test
            app.logger.debug("count check start")
            src_Detail = db_details(case_id.src_db_id)
            target_Detail = db_details(case_id.target_db_id)
            source_cursor = source_db(src_Detail['db_name'],
                                      src_Detail['db_type'].lower(),
                                      src_Detail['db_hostname'].lower(),
                                      src_Detail['db_username'],
                                      src_Detail['db_password']).cursor()
            target_cursor = dest_db(target_Detail['db_name'],
                                    target_Detail['db_type'].lower(),
                                    target_Detail['db_hostname'].lower(),
                                    target_Detail['db_username'],
                                    target_Detail['db_password']).cursor()
            table_name = split_table(case_id.test_case_detail)
            query = get_query(case_id.test_case_detail)
            result = count_check(source_cursor,
                                 target_cursor,
                                 table_name['src_table'],
                                 table_name['target_table'],
                                 query)

        if case_id.test_name == 'NullCheck':  # 2nd Test
            app.logger.debug("Null check start")
            target_Detail = db_details(case_id.target_db_id)
            target_cursor = dest_db(target_Detail['db_name'],
                                    target_Detail['db_type'].lower(),
                                    target_Detail['db_hostname'].lower(),
                                    target_Detail['db_username'],
                                    target_Detail['db_password']).cursor()
            table_name = split_table(case_id.test_case_detail)
            query = get_query(case_id.test_case_detail)
            column = get_column(case_id.test_case_detail)
            result = null_check(target_cursor, table_name['target_table'],
                                column, query)

        if case_id.test_name == 'DuplicateCheck':  # 3 Test
            app.logger.debug("Duplicate check start")
            target_Detail = db_details(case_id.target_db_id)
            target_cursor = dest_db(target_Detail['db_name'],
                                    target_Detail['db_type'].lower(),
                                    target_Detail['db_hostname'].lower(),
                                    target_Detail['db_username'],
                                    target_Detail['db_password']).cursor()
            table_name = split_table(case_id.test_case_detail)
            query = get_query(case_id.test_case_detail)
            column = get_column(case_id.test_case_detail)
            result = duplication(target_cursor,
                                 table_name['target_table'],
                                 column,
                                 query)
        if case_id.test_name == 'Datavalidation':
            table_name = split_table(case_id.test_case_detail)
            src_Detail = db_details(case_id.src_db_id)
            target_Detail = db_details(case_id.target_db_id)
            spark_job = SparkJob()
            spark_job.save_to_db()
            spark_job.test_case_log_id = case_log.test_case_log_id
            spark_job.save_to_db()

            spark_job.job_id = 1
            spark_job.status = "any"
            spark_job.save_to_db()
            result = {'res': 3, "src_value": "none", "des_value": "none"}

        if case_id.test_name == 'DDLCheck':
            app.logger.info("DDL Check start")
            table_name = split_table(case_id.test_case_detail)
            src_Detail = db_details(case_id.src_db_id)
            target_Detail = db_details(case_id.target_db_id)
            source_cursor = source_db(src_Detail['db_name'],
                                      src_Detail['db_type'].lower(),
                                      src_Detail['db_hostname'].lower(),
                                      src_Detail['db_username'],
                                      src_Detail['db_password']).cursor()
            target_cursor = dest_db(target_Detail['db_name'],
                                    target_Detail['db_type'].lower(),
                                    target_Detail['db_hostname'].lower(),
                                    target_Detail['db_username'],
                                    target_Detail['db_password']).cursor()
            result = ddl_check(source_cursor,
                               target_cursor,
                               table_name['src_table'],
                               table_name['target_table'])

        if result['res'] == 1:
            save_test_status(case_id, 1)  # TestCase object.
            case_log.execution_status = 1
            case_log.src_execution_log = result['src_value']
            case_log.des_execution_log = result['des_value']
            case_log.error_log = None
            case_log.save_to_db()

        elif result['res'] == 3:
            save_test_status(case_id, 3)  # TestCase object.
            case_log.execution_status = 3
            case_log.src_execution_log = result['src_value']
            case_log.des_execution_log = result['des_value']
            case_log.error_log = None
            case_log.save_to_db()
            if case_id.test_name == 'Datavalidation':
                src_Detail = db_details(case_id.src_db_id)
                target_Detail = db_details(case_id.target_db_id)
                datavalidation(src_Detail['db_name'],
                               table_name['src_table'],
                               src_Detail['db_type'].lower(),
                               target_Detail['db_name'],
                               table_name['target_table'],
                               target_Detail['db_type'].lower(),
                               spark_job.spark_job_id,
                               src_Detail['db_username'],
                               src_Detail['db_password'],
                               src_Detail['db_hostname'],
                               target_Detail['db_username'],
                               target_Detail['db_password'],
                               target_Detail['db_hostname'])
        elif result['res'] == 0:
            save_test_status(case_id, 2)
            case_log.execution_status = 2
            case_log.src_execution_log = result['src_value']
            case_log.des_execution_log = result['des_value']
            case_log.error_log = None
            case_log.save_to_db()

        elif result['res'] == 2:  # 2 is error (except case)
            save_test_status(case_id, 4)
            case_log.execution_status = 4
            case_log.src_execution_log = result['src_value']
            case_log.des_execution_log = result['des_value']
            case_log.error_log = None
            case_log.save_to_db()

    return True

# ToNote:
# status = {0: "new", 1: "pass", 2: "fail", 3: "in progress", 4: "error"}
# test_case_result = {1: "pass", 0: "fail", 2: "error"}
