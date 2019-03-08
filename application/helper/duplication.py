# from logger import set_up_logging
# logger = set_up_logging()


def duplication(target_cursor, target_table, column_name, test_queries):
    my_list = []
    try:
        column = column_name.split(';')
        if test_queries == 'None':
            print(len(column))
            sub_startquery = ""
            sub_endquery = ""
            for each_col in range(len(column)):
                if sub_startquery == "":
                    sub_startquery = "{0}".format(column[each_col])
                    sub_endquery = "{0}".format(column[each_col])
                else:
                    sub_startquery = sub_startquery \
                                     + ",{0}".format(column[each_col])
                    if len(column) - 1 == each_col:
                        sub_endquery = sub_endquery \
                                       + ",{0}".format(column[each_col])
                    else:
                        sub_endquery = sub_endquery \
                                       + ",{0}".format(column[each_col])
            custom_query = "SELECT " + sub_startquery + \
                           ",COUNT(*) " \
                           "FROM {0} ".format(target_table) + \
                           "GROUP BY " + sub_endquery + " HAVING COUNT(*) >1;"
            print("custom query", custom_query)
            column.append('Count')
            print(column)
            my_list.append(column)
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
