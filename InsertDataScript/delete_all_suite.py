import pymysql

db_name = "acciom_db";
user_name = "Acciom_user";
password = "Acciomuser";
host = "localhost"

delete_table_list = ["sparkjob", "test_case_log", "test_case",
                     "test_suite"]

connection = pymysql.connect(host=host, user=user_name, password=password,
                             db=db_name)
cursor = connection.cursor()

for each_table in delete_table_list:
    sql_query = "DELETE FROM {0}.{1}".format(db_name, each_table)
    # print(sql_query)
    cursor.execute(sql_query)
    print("Deleted all record from {0}.{1}".format(db_name, each_table))

connection.commit()
