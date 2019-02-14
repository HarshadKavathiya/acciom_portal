arr = []


def count_check(source_cursor, target_cursor, source_table, target_table, test_query):
    try:
        print("query", test_query)

        lst=test_query.strip('“').strip('”').split(';')
        print(lst)
        cursor = source_cursor
        if test_query == 'None':
           print("in if")
           cursor.execute('SELECT COUNT(*) FROM {}'.format(source_table))
           pass
        else:
            cursor.execute(lst[0])

            print("in else")
            pass
        for row in cursor:
            for src_count in row:
                pass

        cursor1 = target_cursor
        if test_query == 'None':
            cursor1.execute('SELECT COUNT(*) FROM {}'.format(target_table))
        else:
            cursor1.execute(lst[1])
            pass
        for row in cursor1:
            for target_count in row:
                pass

        if src_count == target_count:
            return {"res": 1, "src_value": src_count,
                    "des_value": target_count}  # pass.
        else:
            # fail.
            return {"res": 0, "src_value": src_count,
                    "des_value": target_count}
    except Exception as e:
        print(e)
        return {"res": 2, "src_value": None, "des_value": None}
