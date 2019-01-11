
arr = []


def count_check(source_cursor, target_cursor, source_table, target_table):
    try:
        cursor = source_cursor
        cursor.execute('SELECT COUNT(*) FROM {}'.format(source_table))
        for row in cursor:
            for src_count in row:
                pass

        cursor1 = target_cursor
        cursor1.execute('SELECT COUNT(*) FROM {}'.format(target_table))
        for row in cursor1:
            for target_count in row:
                pass

        if src_count == target_count:
            return {"res": 1, "src_value": src_count, "des_value": target_count}  # pass.
        else:
            # fail.
            return {"res": 0, "src_value": src_count, "des_value": target_count}
    except:
        return {"res": 2, "src_value": None, "des_value": None}
