import psycopg2
import pymysql
import pyodbc
import cx_Oracle




def source_db(src_db, src_db_type, src_host, src_db_username, src_db_password):
    if src_db_type == 'sqlserver':
        database = src_db
        cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server}'
                              ';SERVER=' + src_host + ';DATABASE=' + database +
                              ';UID=' + src_db_username +
                              ';PWD=' + src_db_password)
        return cnxn
    elif src_db_type == 'mysql':
        cnxn = pymysql.connect(host=src_host,
                               user=src_db_username,
                               password=src_db_password,
                               db=src_db)
        return cnxn
    elif src_db_type == 'postgres':
        cnxn = psycopg2.connect(host=src_host,
                                database=src_db, user=src_db_username,
                                password=src_db_password)
        return cnxn
    elif src_db_type == 'oracle':
        con = cx_Oracle.connect("{0}/{1}@{2}".format(src_db_username,src_db_password,src_host))
        return con





def dest_db(target_db, dest_db_type, dest_host,
            dest_db_username, dest_db_password):

    if dest_db_type == 'sqlserver':
        cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server}'
                              ';SERVER=' + dest_host +
                              ';DATABASE=' + target_db +
                              ';UID=' + dest_db_username +
                              ';PWD=' + dest_db_password)
        return cnxn
    elif dest_db_type == 'mysql':
        cnxn = pymysql.connect(host=dest_host,
                               user=dest_db_username,
                               password=dest_db_password,
                               db=target_db)
        return cnxn
    elif dest_db_type == 'postgres':
        cnxn = psycopg2.connect(host=dest_host,
                                database=target_db,
                                user=dest_db_username,
                                password=dest_db_password)
        return cnxn

    elif dest_db_type == 'oracle':
        con = cx_Oracle.connect("{0}/{1}@{2}".format(dest_db_username, dest_db_password, dest_host))
        cursor = con.cursor()

        cursor.execute("SELECT COLUMN_NAME,DATA_TYPE,NULLABLE FROM USER_TAB_COLUMNS WHERE TABLE_NAME = 'NEWINVENTORY'")

        data = []
        for row in cursor:
            data.append(row)
        print("dataaa",data)
        return con

