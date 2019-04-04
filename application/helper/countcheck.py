from flask import current_app as app

# from application.helper.runner_class import split_query

arr = []


def count_check(source_cursor, target_cursor, source_table,
                target_table, test_query):
    payload = {"res": None, "src_value": None,
               "des_value": None}
    try:
        lst = test_query.split(';')
        newlst = [i.split(':') for i in lst]
        app.logger.debug(newlst)
        # newlst = split_query(test_query)
        if test_query == 'None':
            source_cursor.execute(
                'SELECT COUNT(1) FROM {}'.format(source_table))
            target_cursor.execute(
                'SELECT COUNT(1) FROM {}'.format(target_table))
        else:
            source_cursor.execute(newlst[0][1])
            target_cursor.execute(newlst[1][1])
        for row in source_cursor:
            for src_count in row:
                pass
        for row in target_cursor:
            for target_count in row:
                pass
        if src_count == target_count:
            payload["res"] = 1
            payload["src_value"] = src_count
            payload["des_value"] = target_count  # pass.
            app.logger.info("count check sucess")
        else:
            payload["res"] = 0
            payload["src_value"] = src_count
            payload["des_value"] = target_count
            app.logger.info("count check fail")
    except Exception as e:
        app.logger.error(e)
        return {"res": 2, "src_value": str(e), "des_value": str(e)}

    return payload
