import json

from flask import current_app as app


def ddl_check(source_cursor, target_cursor, source_table, target_table):
    try:
        data1 = []
        data2 = []
        cursor = source_cursor
        cursor.execute(
            "SELECT COLUMN_NAME, IS_NULLABLE,DATA_TYPE FROM information_schema.columns WHERE table_name = '{}'".format(
                source_table)
        )

        for row in cursor:
            data1.append(row)

        cursor1 = target_cursor
        cursor1.execute(
            "SELECT COLUMN_NAME, IS_NULLABLE,DATA_TYPE FROM information_schema.columns WHERE table_name = '{}'".format(
                target_table))

        for row in cursor1:
            data2.append(row)

        set_1, set_2 = set(data1), set(data2)
        a = list(set_1 & set_2)
        for item in a:
            data1.remove(item)
            data2.remove(item)

        new_list1 = list()
        new_list2 = list()
        for item in data1:
            new_list1.append(item[0])

        for item in data2:
            new_list2.append(item[0])

        for x in range(len(data1)):
            if data1[x][0] not in new_list2 and data1[x][0] != "Missing":
                t = ("Missing",)
                data2.insert(x, t)
        for x in range(len(data2)):
            if data2[x][0] not in new_list1 and data2[x][0] != "Missing":
                t = ("Missing",)
                data1.insert(x, t)

        x = json.dumps(data1)
        y = json.dumps(data2)

        if data1 == [] and data2 == []:
            return {"res": 1, "src_value": "none1",
                    "des_value": "none1"}
        else:

            return {"res": 0, "src_value": x,
                    "des_value": y}

    except Exception as e:
        app.logger.error(e)
        return {"res": 2, "src_value": None, "des_value": None}
