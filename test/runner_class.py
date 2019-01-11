from test.countcheck import count_check
from test.nullcheck import null_check
from test.duplication import duplication
from models.user import TestCaseLog, TestCase
from test.dbconnect import source_db, dest_db
import psycopg2

def split_table(table_name):
    """
    :param table_name: gets table_src_target value stored in TestSuite table
    :return: returns a list consist of source and destination db.
    """

    lst1 = []
    lst = table_name.strip(';').split(':')
    lst1.append(lst)
    return lst1


def save_case_log(test_case_id, execution_status, src_execution_log
                  , des_execution_log
                  , error_log):

    temp = TestCaseLog(test_case_id=test_case_id, execution_status=execution_status
                       , src_execution_log=src_execution_log
                       , des_execution_log=des_execution_log, error_log=error_log)
    return temp.save_to_db()


def save_test_status(test_case_id, status):
    """

    :param test_case_id : test case object.
    :param status: test_status of Testcase object
    :return: just store value in db.
    """
    test_case_id.test_status = status
    test_case_id.save_to_db()
    return True


def split_db(test_db_detail):
    lst1 = []
    lst2 = []
    strip_db_detail = test_db_detail.strip("@'").split("'@")
    for i in range(len(strip_db_detail)):
        lst1.append(strip_db_detail[i].split(':'))
    lst2.append(lst1[2][1].strip('\n'))
    lst2.append(lst1[4][1].strip('\n'))
    lst2.append(lst1[0][1].strip('\n'))
    lst2.append(lst1[3][1].strip('\n'))
    return lst2


def run_by_case_id(test_case_id):
    """
    :param test_case_id: recieves case_id to be tested.
    :return: just run the test case.
    """
    test_case = TestCase.query.filter_by(test_case_id=test_case_id).first()
    run_test(test_case)
    return True


def run_test(case_id):
    """
    :param case_id: case_id is test_case_id
    :return: it does the test on test_case_id based on  its test_name
    """
    if case_id.test_name == 'CountCheck':  # 1st Test
        db_type = split_db(case_id.test_detail)
        source_cursor = source_db(db_type[0][1:], db_type[2][1:]).cursor()
        target_cursor = dest_db(db_type[1][1:], db_type[3][1:]).cursor()
        table_name = split_table(case_id.table_src_target)
        result = count_check(source_cursor, target_cursor, table_name[0][0], table_name[0][1])

    if case_id.test_name == 'NullCheck':  # 2nd Test
        db_type = split_db(case_id.test_detail)
        target_cursor = dest_db(db_type[1][1:], db_type[3][1:]).cursor()
        table_name = split_table(case_id.table_src_target)
        result = null_check(target_cursor, table_name[0][1])

    if case_id.test_name == 'DuplicateCheck':  # 3 Test
        db_type = split_db(case_id.test_detail)
        target_cursor = dest_db(db_type[1][1:], db_type[3][1:]).cursor()
        table_name = split_table(case_id.table_src_target)
        result = duplication(target_cursor=target_cursor, target_table=table_name[0][1])

    if result['res'] == 1:
        save_test_status(case_id, 1)  # TestCase object.
        save_case_log(case_id.test_case_id, case_id.test_status, result['src_value'], result['des_value'], None)

    elif result['res'] == 0:
        save_test_status(case_id, 2)
        save_case_log(case_id.test_case_id, case_id.test_status, result['src_value'], result['des_value'], None)
    elif result['res'] == 2:  # 2 is error (except case)
        save_test_status(case_id, 4)
        save_case_log(case_id.test_case_id, case_id.test_status, None, None, "error")

    return True









# ToNote:
# status = {0: "new", 1: "pass", 2: "fail", 3: "in progress", 4: "error"}
# test_case_result = {1: "pass", 0: "fail", 2: "error"}
