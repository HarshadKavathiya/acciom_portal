import datetime
import time

from flask import render_template
from flask_mail import Message, Mail

from application.models.user import (TestSuite, TestCaseLog,TestCase)
from index import app
from index import db
import functools

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
        # db.session.commit()
        testcase_log_id = TestCaseLog.query.filter_by(
            test_case_log_id=each_log).first()
        if testcase_log_id.execution_status == 3:
            return False
            break;
    return True


def suite_level_send_mail(case_log_id_list, email, suite_id):
    time.sleep(10)
    Test_Name = []
    Test_Description = []
    Test_src_table = []
    Test_target_table = []
    Test_status = []


    print(case_log_id_list, email)
    while not check_status(case_log_id_list):
        db.session.commit()
        time.sleep(10)
    suite = TestSuite.query.filter_by(test_suite_id=suite_id).first()
    print(suite)
    for each_test in suite.test_case:
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
    Null_display = []
    Dup_display = []
    for i in case_log_id_list:
        case_log_id = TestCaseLog.query.filter_by(test_case_log_id=i).first()
        case = TestCase.query.filter_by(test_case_id=case_log_id.test_case_id).first()
        if case.test_name == 'NullCheck' and case_log_id.des_execution_log is not None:
            Table = (list(json.loads(case.test_case_detail)['table'].values())[0])
            length = len(json.loads(case_log_id.des_execution_log))
            Null_display.append({"data":json.loads(case_log_id.des_execution_log)[:11],"records":length-1,"table":Table})
        elif case.test_name == 'DuplicateCheck' and case_log_id.des_execution_log is not None:
            print("do some logic")
            Table = (list(json.loads(case.test_case_detail)['table'].values())[0])
            Dup_display.append({"data":json.loads(case_log_id.des_execution_log)[:11], "table":Table})
    print(Dup_display)
    payload = {}
    payload = {"status": True, "message": "send Mail"}
    print(payload)
    msg = Message('Quality Suite Result',
                  sender=("Acciom", app.config.get('MAIL_USERNAME')),
                  recipients=[email])
    current_time = datetime.datetime.now()
    current_time.strftime("%c")
    with app.app_context():
        msg.html = render_template(
        'email.html', content=render_list,
        zip_content=zip(Test_Name, Test_Description, Test_src_table,
                        Test_target_table, Test_status),
        suite_name=suite.test_suite_name, suite_id=suite.test_suite_id,
        executed_at=str(current_time.strftime("%c")), Null_display = Null_display, Dup_display=Dup_display)
        mail.send(msg)
