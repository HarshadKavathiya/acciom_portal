





def ddl_check(source_cursor, target_cursor, source_table, target_table):
    try:
        cursor = source_cursor
        print(source_table)
        cursor.execute("SELECT COLUMN_NAME,DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '{}'".format(source_table))
        data1 = []
        data2 = []
        lr = []
        l1 = []
        l2 = []
        result_diff = []
        result_diff2 = []
        result_diff3 = []
        res2 =""
        result1=""
        result2=""

        for row in cursor:
            data1.append(row)
            d1=dict(data1)
        print("dictionary source", d1)


        cursor1 = target_cursor
        print(target_table)
        cursor1.execute("SELECT COLUMN_NAME,DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '{}'".format(target_table))

        for row in cursor1:
            data2.append(row)
            d2 = dict(data2)
        print("dictionary destination", d2)

        for each_key in d1:
            if each_key in d2:
                l1.append(d1[each_key])
                # print(l1)
                l2.append(d2[each_key])
                # print(l2)
            else:
                result_diff.append(each_key)
                lr.append("Failbycolumname")


        res = str([x for x in result_diff])

        if l1 == l2:
            lr.append("pass")
            print("lr is a",lr)
        else:

            result1=((str([x for x in l1])))
            result2=(str([x for x in l2]))
            result_diff2.append(result1)
            result_diff2.append(result2)
            print("result_diff2=", result_diff2)
            res2=str(result_diff2)
            lr.append("failbycolumntype")





        result_diff3.append(result_diff)
        result_diff3.append(result1)
        result_diff3.append(result2)
        res3=str(result_diff3)
        print(res3)

        print("lr is",lr)

        if "Failbycolumname" in lr and  not "failbycolumntype" in lr:
              # print("Fail")
            return {"res": 0, "src_value": res,
                    "des_value": "none"}
        elif "failbycolumntype" in lr and not "Failbycolumname" in lr:
            return {"res": 0, "src_value": res2,
                    "des_value": "none"}
        elif "failbycolumntype" in lr and  "Failbycolumname" in lr:
            return {"res": 0, "src_value": res3,
                    "des_value": "none"}
        elif "pass":
              # print("Pass")

            return {"res": 1, "src_value": "none1",
                    "des_value": "none1"}
        else:
            pass
    except Exception as e:
        print(e)
        return {"res": 2, "src_value": None, "des_value": None}














