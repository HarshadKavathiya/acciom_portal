from utils.Response import success, standard_response, error
#
# from flask import Flask
# app = Flask(__name__)
arr = []
from flask import current_app as app


def count_check(source_cursor, target_cursor, source_table, target_table, test_query):
    payload = {"res": None, "src_value": None,
               "des_value": None}
    try:
        print("query", test_query)
        temp = test_query.strip('@')
        lst = temp.split(';')
        print(temp)
        print(lst)
        newlst = [i.split(':') for i in lst]
        print(newlst)

        if test_query == 'None':
                print("in if")
                source_cursor.execute('SELECT COUNT(*) FROM {}'.format(source_table))
                target_cursor.execute('SELECT COUNT(*) FROM {}'.format(target_table))
        else:
                source_cursor.execute(newlst[0][1])
                target_cursor.execute(newlst[1][1])
                print("in else")
        for row in source_cursor:
            for src_count in row:
                pass
        for row in target_cursor:
            for target_count in row:
                pass
        print(src_count,target_count)
        if src_count == target_count:
            payload["res"] = 1
            payload["src_value"]=src_count
            payload["des_value"]=target_count  # pass.
            app.logger.info("count check sucess")
        else:
            payload["res"] = 0
            payload["src_value"]=src_count
            payload["des_value"]=target_count
            app.logger.info("count check fail")
    except Exception as e:
        app.logger.error(e)
        print(e)
        return {"res": 2, "src_value": None, "des_value": None}
    print(payload)

    return payload
