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


def null_check(target_cursor, target_table, column, test_queries, db_type):
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
        print("2",target_table)
        if db_type == 'oracle':
            target_cursor.execute("SELECT column_name FROM "
                                  "user_tab_cols"
                                  " WHERE table_name=UPPER('{0}')".format(target_table))
        else:
            target_cursor.execute(
                "SELECT COLUMN_NAME FROM "
                "information_schema.COLUMNS"
                " WHERE table_name='{0}'".format(target_table))
        print("3")

        for col in target_cursor:
            for each_col in col:
                col_list.append(each_col)
        if (test_queries == {} or test_queries['targetqry'].isspace()
                or test_queries['targetqry'] == ""):
            flag = True
            if column == []:
                sub_query = qry_generator(col_list, target_table)
                target_cursor.execute(sub_query)
            else:
                sub_query = qry_generator(column, target_table)
                target_cursor.execute(sub_query)
        else:
            flag = True
            if "select * from" in (test_queries["targetqry"].lower()):
                print("* qry exists")
                target_query = test_queries["targetqry"]
                newlst.append(target_query)
                target_cursor.execute(newlst[0])
            else:
                flag = False
                # logic for other qry.
                print("custom qry for cols.")
                qry = (test_queries["targetqry"]).lower()
                start = "select"
                end = "from"
                columns = qry[
                          qry.index(start) + len(start):
                          qry.index(end)]
                if "," in columns:
                    col_list_custom = columns.split(",")
                    print(col_list_custom)
                else:
                    col_list_custom = []
                    col_list_custom.append(columns)
                print(col_list_custom)
                target_query = test_queries["targetqry"]
                newlst.append(target_query)
                target_cursor.execute(newlst[0])

        all_results = []
        for row in target_cursor:
            all_results.append(list(map(str, row)))

        if all_results:
            if flag == True:
                print("all_results",all_results)
                for i in all_results:
                    for x in range(0, len(i)):
                        if i[x] == "None":
                            i[x] = "Null"
                        else:
                            i[x] == i[x]
                print("all_results", all_results)
                all_results.insert(0, col_list)
                a = json.dumps(all_results)
            elif flag == False:
                print("all_results", all_results)
                for i in all_results:
                    for x in range(0, len(i)):
                        if i[x] == "None":
                            i[x] = "Null"
                        else:
                            i[x] == i[x]
                print("all_results", all_results)
                all_results.insert(0, col_list_custom)
                a = json.dumps(all_results)

            return ({"res": 0, "src_value": None,
                     "des_value": a})
        else:
            return {"res": 1, "src_value": None,
                    "des_value": None}

    except Exception as e:
        app.logger.debug(e)
        return {"res": 2, "src_value": None, "des_value": None}