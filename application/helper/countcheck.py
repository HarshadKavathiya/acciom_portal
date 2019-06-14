from flask import current_app as app

# from application.helper.runner_class import split_query

arr = []


def count_check(source_cursor, target_cursor, source_table,
                target_table, test_query):
    payload = {"res": None, "src_value": None,
               "des_value": None}
    try:
        newlst = []

        app.logger.debug(newlst)
        if test_query == {}:
            source_cursor.execute(
                'SELECT COUNT(1) FROM {}'.format(source_table))
            target_cursor.execute(
                'SELECT COUNT(1) FROM {}'.format(target_table))
        else:
            src_query = test_query["sourceqry"]
            target_query = test_query["targetqry"]
            newlst.append(src_query)
            newlst.append(target_query)
            source_cursor.execute(newlst[0])
            target_cursor.execute(newlst[1])
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
        app.logger.error("error countcheck", e)
        print("error", e)
        return {"res": 2, "src_value": str(e), "des_value": str(e),
                }

    return payload
