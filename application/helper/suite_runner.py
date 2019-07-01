import time
from multiprocessing import Process, Queue

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


def return_result(case_log_id_list):
    while not check_status(case_log_id_list):
        time.sleep(10)
    # for each_log in case_log_id_list:
    #     testcase_log = TestCaseLog.query.filter_by(
    #         test_case_log_id=each_log).first()

    src_count_countcheck = []
    dest_count_countcheck = []
    null_check_counts = []
    src_count_datavalidation = []
    dest_count_datavalidation = []
    src_to_dest = []
    dest_to_src = []

    payload = {}
    payload = {"status": True, "message": "send Mail"}
    print(payload)
    msg = Message('Test Suite Response After Execution',
                  sender=("Acciom", app.config.get('MAIL_USERNAME')),
                  recipients=['akhil.bhardwaj@accionlabs.com'])

    msg.html = render_template(
        'email.html')
    mail.send(msg)


def execute_suite_by_id(suite_id, email):
    case_log_id_list = []
    test_suite = TestSuite.query.filter_by(
        test_suite_id=suite_id).first()
    for each_test in test_suite.test_case:
        res = run_by_case_id(each_test.test_case_id)
        case_log_id_list.append(res['result']['test_case_log_id'])
    print("After Executing Test all logs:", case_log_id_list)
    # return_result(case_log_id_list)
    # return_result(case_log_id_list, email)
    queue = Queue()
    p = Process(target=return_result,
                args=(queue, case_log_id_list))
    p.start()

    #  send mail
    # queue = Queue()
    # p = Process(target=check_status, args=(queue, test_suite))
    # p.start()
    # p.join()  # this blocks until the process terminates
    # result = queue.get()
    # print("Email sent")
    # Add logic to send mail and completion of suite
