import time
from multiprocessing import Process

from flask import render_template
from flask_mail import Message, Mail

from application.helper.runner_class import run_by_case_id
from application.models.user import TestSuite, TestCaseLog
from index import app
from index import db

mail = Mail(app)


# app.config('EMAIL_ON_SUITE_EXECUTION', True)
# app.config('PARALLEL_SUITE_EXECUTION', True)


def check_status(case_log_id_list):
    if not start_test(case_log_id_list):
        return False
    else:
        return True


def start_test(case_log_id_list):
    for each_log in case_log_id_list:
        print(case_log_id_list)
        db.session.rollback()
        testcase_log_id = TestCaseLog.query.filter_by(
            test_case_log_id=each_log).first()
        if testcase_log_id.execution_status == 3:
            return False
            break;
    return True


def return_result(case_log_id_list, email, suite_id):
    Test_Name = []
    Test_Description = []
    Test_src_table = []
    Test_target_table = []
    Test_status = []

    print(case_log_id_list, email)
    while not check_status(case_log_id_list):
        time.sleep(10)
    suite = TestSuite.query.filter_by(test_suite_id=suite_id).first()
    print(suite)
    for each_test in suite.test_case:
        src_table = ''
        dest_table = ''
        print(each_test)
        # case = TestCase.query.filter_by(test_case_id=each_test).first()
        Test_Name.append(each_test.test_name)
        Test_Description.append(each_test.test_id)
        Test_status.append(each_test.test_status)
        import json
        (src_table, dest_table), = json.loads(each_test.test_case_detail)[
            'table'].items()
        Test_src_table.append(src_table)
        Test_target_table.append(dest_table)
    print(Test_status, Test_Name, Test_Description, Test_src_table,
          Test_target_table)
    render_list = {}
    render_list['Test_status'] = Test_status
    render_list['Test_Name'] = Test_Name
    render_list['Test_Description'] = Test_Description
    render_list['src_tables'] = Test_src_table
    render_list['dest_tables'] = Test_target_table
    # print(render_list)
    payload = {}
    payload = {"status": True, "message": "send Mail"}
    print(payload)
    msg = Message('Test Suite Response After Execution',
                  sender=("Acciom", app.config.get('MAIL_USERNAME')),
                  recipients=[email])

    msg.html = render_template(
        'email.html', content=render_list,
        zip_content=zip(Test_Name, Test_Description, Test_src_table,
                        Test_target_table, Test_status))
    mail.send(msg)


def execute_suite_by_id(suite_id, email):
    case_log_id_list = []
    test_suite = TestSuite.query.filter_by(
        test_suite_id=suite_id).first()
    for each_test in test_suite.test_case:
        res = run_by_case_id(each_test.test_case_id)
        case_log_id_list.append(res['result']['test_case_log_id'])
    print("After Executing Test all logs:", case_log_id_list)
    p = Process(target=return_result, args=(case_log_id_list, email, suite_id))
    p.start()
    p.join()
    return True

    # return_result(case_log_id_list, email, suite_id)

#
# def return_result(case_log_id_list, email, suite_id):
#     return True
