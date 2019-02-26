# from logger import set_up_logging
# logger = set_up_logging()


def null_check(target_cursor, target_table, column, test_queries):
    try:
        # print("test query", column)
        columns = column.split(';')

        query = test_queries.split(':')
        if test_queries == 'None':
            sub_query = ""

            for each_col in columns:
                if sub_query == "":
                    sub_query = "SELECT * FROM {0} WHERE ".format(
                        target_table) + each_col + " is NULL"
                else:
                    sub_query = sub_query + " or " + each_col + " is NULL"
            print(sub_query)
            target_cursor.execute(sub_query)
        else:
            # print("came in custom query")
            target_cursor.execute(query[1])

        all_results = []
        # all_results.append(columns)
        for row in target_cursor:
            all_results.append(row)
        import json
        res1 = json.dumps(all_results)

        if all_results:
            return ({"res": 0, "src_value": None,
                     "des_value": res1})
        else:
            return {"res": 1, "src_value": None,
                    "des_value": None}

    except Exception as e:
        print(e)
        return {"res": 2, "src_value": None, "des_value": None}
