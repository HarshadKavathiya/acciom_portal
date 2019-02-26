def ddl_check(source_cursor, target_cursor, source_table, target_table):
    try:
        cursor = source_cursor
        cursor.execute(
            "SELECT COLUMN_NAME,"
            "DATA_TYPE FROM "
            "INFORMATION_SCHEMA.COLUMNS WHERE"
            " TABLE_NAME = '{}'".format(source_table))
        data1 = []
        data2 = []
        lr = []
        l1 = []
        l2 = []
        result_diff_src = []
        result_diff_target = []
        result_diff2 = []
        result_diff3 = []
        res2 = ""

        for row in cursor:
            data1.append(row)
            d1 = dict(data1)

        cursor1 = target_cursor
        cursor1.execute(
            "SELECT COLUMN_NAME,DATA_TYPE"
            " FROM INFORMATION_SCHEMA.COLUMNS"
            " WHERE "
            "TABLE_NAME = '{}'".format(target_table))

        for row in cursor1:
            data2.append(row)
            d2 = dict(data2)

        for each_key in d1:
            if each_key in d2:
                l1.append(d1[each_key])
                l2.append(d2[each_key])
            else:
                result_diff_src.append(each_key)
                lr.append("Failbycolumname")

        for each_key in d2:
            if each_key in d1:
                pass
            else:
                result_diff_target.append(each_key)
                lr.append("Failbycolumname")

        res = str([x for x in result_diff_src])
        res4 = str([x for x in result_diff_target])

        if l1 == l2:
            lr.append("pass")
        else:

            result1 = ((str([x for x in l1])))
            result2 = (str([x for x in l2]))
            result_diff2.append(result1)
            result_diff3.append(result2)
            print("result_diff2=", result_diff2)
            res2 = str(result_diff2)
            res3 = str(result_diff3)
            lr.append("failbycolumntype")

        if "Failbycolumname" in lr and not "failbycolumntype" in lr:
            # print("Fail")
            return {"res": 0, "src_value": res,
                    "des_value": res4}
        elif "failbycolumntype" in lr and not "Failbycolumname" in lr:
            return {"res": 0, "src_value": res2,
                    "des_value": res3}
        elif "failbycolumntype" in lr and "Failbycolumname" in lr:
            return {"res": 0, "src_value": res,
                    "des_value": res4}
        elif "pass":
            # print("Pass")
            return {"res": 1, "src_value": "none1",
                    "des_value": "none1"}

        else:
            pass
    except Exception as e:
        print(e)
        return {"res": 2, "src_value": None, "des_value": None}
