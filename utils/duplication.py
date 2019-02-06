
def duplication(target_cursor, target_table):

        target_cursor.execute('SELECT name,quantity,'
                              ' COUNT(*) FROM {} GROUP BY name,'
                              'quantity HAVING COUNT(*)'
                              ' > 1'.format(target_table))

        my_list = []
        try:
            for row in target_cursor:
                my_list.append(f"{row}")
            res = "\n".join(my_list)

            if my_list:
                return {"res": 0, "src_value": None, "des_value": res}
            else:
                return {"res": 1, "src_value": "src_value not require",
                        "des_value": "No Duplicate Records Available"}
        except Exception as e:
            print(e)
            return {"res": 2, "src_val": "src_value", "des_value": "des_val"}
