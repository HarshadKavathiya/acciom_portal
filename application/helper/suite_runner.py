from application.helper.runner_class import run_by_case_id
from application.models.user import TestSuite


# app.config('EMAIL_ON_SUITE_EXECUTION', True)
# app.config('PARALLEL_SUITE_EXECUTION', True)


def execute_suite_by_id(suite_id):
    test_suite = TestSuite.query.filter_by(
        test_suite_id=suite_id).first()

    # Need to add subprocess
    for each_test in test_suite.test_case:
        run_by_case_id(each_test.test_case_id)

    # Add logic to send mail and completion of suite
   