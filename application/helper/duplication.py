# from logger import set_up_logging
# logger = set_up_logging()


def qry_generator(columns, target_table):
    sub_startquery = ""
    sub_endquery = ""
    for each_col in range(len(columns)):
        if sub_startquery == "":
            sub_startquery = "{0}".format(columns[each_col])
            sub_endquery = "{0}".format(columns[each_col])
        else:
            sub_startquery = sub_startquery \
                             + ",{0}".format(columns[each_col])
            if len(columns) - 1 == each_col:
                sub_endquery = sub_endquery \
                               + ",{0}".format(columns[each_col])
            else:
                sub_endquery = sub_endquery \
                               + ",{0}".format(columns[each_col])
    custom_query = "SELECT " + sub_startquery + \
                   ",COUNT(*) " \
                   "FROM {0} ".format(target_table) + \
                   "GROUP BY " + sub_endquery + " HAVING COUNT(*) >1;"
    return custom_query


def duplication(target_cursor, target_table, column_name, test_queries):
    my_list = []
    col_list = []
    try:
        target_cursor.execute(
            "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='{0}'".format(target_table))

        for col in target_cursor:
            for each_col in col:
                col_list.append(each_col)
        print("All coumns in schema", col_list)
        column = column_name.split(':')
        print(column)
        if test_queries == 'None':
            if column_name == 'None':

                custom_query = qry_generator(col_list, target_table)
                print(custom_query)

            else:
                custom_query = qry_generator(column, target_table)
                print(custom_query)
        else:
            custom_query = test_queries.split(':')[1]
            print("custom query", custom_query)

        target_cursor.execute(custom_query)

        for row in target_cursor:
            my_list.append(row)
        import json
        res1 = json.dumps(my_list)
        if my_list:
            # logger.debug("Duplication check Failed")
            return {"res": 0, "src_value": "src_val_not required",
                    "des_value": res1}
        else:
            # logger.debug("Duplication check Successfull")
            return {"res": 1, "src_value": "src_value not require",
                    "des_value": None}

    except Exception as e:
        # logger.debug(e)
        print(e)
        return {"res": 2, "src_value": "src_value", "des_value": "des_val"}
