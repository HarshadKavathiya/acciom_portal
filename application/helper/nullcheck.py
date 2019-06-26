# from logger import set_up_logging
# logger = set_up_logging()
import json

from flask import current_app as app


def qry_generator(columns, target_table):
    '''

    :param columns: columns (1 or more)
    :param target_table: table name
    :return: gives a custom query based for null check based on params.
    '''
    sub_query = ""
    for each_col in columns:
        if sub_query == "":
            sub_query = "SELECT * FROM {0} WHERE ".format(
                target_table) + each_col + " is NULL"
        else:
            sub_query = sub_query + " or " + each_col + " is NULL"
    return sub_query


def null_check(target_cursor, target_table, column, test_queries):
    '''

    :param target_cursor: as name tells
    :param target_table: table
    :param column: all columns
    :param test_queries: custom query
    :return: result for the test(pass, fail, error)
    '''
    try:
        col_list = []
        newlst = []
        app.logger.debug(column)
        target_cursor.execute(
            "SELECT COLUMN_NAME FROM "
            "information_schema.COLUMNS"
            " WHERE table_name='{0}'".format(target_table))

        for col in target_cursor:
            for each_col in col:
                col_list.append(each_col)
        if (test_queries == {} or test_queries['targetqry'].isspace()
                or test_queries['targetqry'] == ""):
            if column == []:
                sub_query = qry_generator(col_list, target_table)
                target_cursor.execute(sub_query)
            else:
                sub_query = qry_generator(column, target_table)
                target_cursor.execute(sub_query)
        else:
            target_query = test_queries["targetqry"]
            newlst.append(target_query)
            target_cursor.execute(newlst[0])

        all_results = []

        for row in target_cursor:
            print("62",row)
            all_results.append(list(map(str, row)))

        if all_results:
            all_results.insert(0, col_list)
            print(all_results)
            a = json.dumps(all_results)


            return ({"res": 0, "src_value": None,
                     "des_value": a})
        else:
            return {"res": 1, "src_value": None,
                    "des_value": None}

    except Exception as e:
        app.logger.debug(e)
        return {"res": 2, "src_value": None, "des_value": None}
