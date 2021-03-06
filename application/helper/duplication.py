from flask import current_app as app


def qry_generator(columns, target_table):
    '''

    :param columns: columns
    :param target_table: table name
    :return: custom query for duplication check
    '''

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
                   "GROUP BY " + sub_endquery + " HAVING COUNT(*) >1"
    # custom_query = "SELECT " + sub_startquery +",COUNT(*) FROM {0} ".format(target_table) + "GROUP BY " + sub_startquery +" HAVING COUNT(*)>1"
    return custom_query


def duplication(target_cursor, target_table, column_name, test_queries,
                db_type):
    col_list = []
    newlst = []
    try:
        if db_type == 'oracle':
            target_cursor.execute("SELECT column_name FROM "
                                  "user_tab_cols"
                                  " WHERE table_name=UPPER('{0}')".format(
                target_table))
        else:
            target_cursor.execute(
                "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS"
                " WHERE table_name='{0}'".format(
                    target_table))
        for col in target_cursor:
            for each_col in col:
                col_list.append(each_col)

        if (test_queries == {} or test_queries['targetqry'].isspace() or
                test_queries['targetqry'] == ""):
            if column_name == []:
                custom_query = qry_generator(col_list, target_table)
            else:
                custom_query = qry_generator(column_name, target_table)
                # if column give in excel
        else:
            target_query = test_queries["targetqry"]
            newlst.append(target_query)
            custom_query = newlst[0]
        target_cursor.execute(custom_query)

        all_results = []

        for row in target_cursor:
            all_results.append(list(map(str, row)))
        import json
        if all_results:
            if (test_queries == {} or test_queries['targetqry'].isspace() or
                    test_queries['targetqry'] == ""):
                if column_name == []:
                    col_list.append("Duplicate Occurance")
                    print(all_results)
                    for i in all_results:
                        for x in range(0, len(i)):
                            if i[x] == "None":
                                i[x] = "Null"
                            else:
                                i[x] == i[x]
                    print(all_results)

                    all_results.insert(0, col_list)
                    res1 = json.dumps(all_results)
                else:
                    column_name.append("Duplicate Occurance")
                    for i in all_results:
                        for x in range(0, len(i)):
                            if i[x] == "None":
                                i[x] = "Null"
                            else:
                                i[x] == i[x]
                    all_results.insert(0, column_name)
                    res1 = json.dumps(all_results)
                    # if column give in excel
            else:
                if "select * from" in (test_queries["targetqry"].lower()):
                      col_list.append("Duplicate Occurance")
                      for i in all_results:
                          for x in range(0, len(i)):
                              if i[x] == "None":
                                  i[x] = "Null"
                              else:
                                  i[x] == i[x]
                      all_results.insert(0, col_list)
                      res1 = json.dumps(all_results)
                else:
                    print("custom qry for cols.")
                    qry = (test_queries["targetqry"]).lower()
                    start = "by"
                    end = "having"
                    columns = qry[
                              qry.index(start) + len(start):
                              qry.index(end)]
                    print("columns",columns)
                    if "," in columns:
                       column = columns.split(",")
                       print("column",column)
                       column.append("Duplicate Occurance")
                       for i in all_results:
                           for x in range(0, len(i)):
                               if i[x] == "None":
                                   i[x] = "Null"
                               else:
                                   i[x] == i[x]
                       all_results.insert(0, column)
                       res1 = json.dumps(all_results)

                    else:
                        col_list_custom = []
                        print("column2",columns)
                        col_list_custom.append(columns)
                        col_list_custom.append("Duplicate Occurance")
                        for i in all_results:
                            for x in range(0, len(i)):
                                if i[x] == "None":
                                    i[x] = "Null"
                                else:
                                    i[x] == i[x]
                        all_results.insert(0, col_list_custom)
                        res1 = json.dumps(all_results)


            return {"res": 0, "src_value": "src_val_not required",
                    "des_value": res1}
        else:
            return {"res": 1, "src_value": "src_value not require",
                    "des_value": None}

    except Exception as e:
        app.logger.error(e)
        return {"res": 2, "src_value": "src_value", "des_value": "des_val"}
