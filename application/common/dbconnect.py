import pyodbc

#  import os
import psycopg2
# from db import db
import pymysql

from db_config import (SOURCE_DB_USERNAME, SOURCE_DB_PASSWORD, SOURCE_DB_HOSTNAME, \
                       DEST_DB_USERNAME, DEST_DB_PASSWORD, DEST_DB_HOSTNAME)

# TODO: DO THE CONNECTION FOR DIFFRENT DARTABASES.
source_username = SOURCE_DB_USERNAME
source_password = SOURCE_DB_PASSWORD
source_hostname = SOURCE_DB_HOSTNAME

dest_username = DEST_DB_USERNAME
dest_password = DEST_DB_PASSWORD
dest_hostname = DEST_DB_HOSTNAME


def source_db(src_db, src_db_type):
    print("IN dbconnect", src_db_type)
    if src_db_type == 'sqlserver':
        server = source_hostname
        database = src_db
        username = source_username
        password = source_password
        cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server}'
                              ';SERVER=' + server + ';DATABASE=' + database +
                              ';UID=' + username + ';PWD=' + password)
        return cnxn
    elif src_db_type == 'mysql':
        cnxn = pymysql.connect(host=source_hostname,
                               user=source_username,
                               password=source_password,
                               db=src_db)
        return cnxn
    elif src_db_type == 'postgres':
        cnxn = psycopg2.connect(host=source_hostname,
                                database="testdb", user=source_username,
                                password=source_password)
        return cnxn


def dest_db(target_db, dest_db_type):
    if dest_db_type == 'sqlserver':
        server = dest_hostname
        database = target_db
        username = dest_username
        password = dest_password
        cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server}'
                              ';SERVER=' + server + ';DATABASE=' + database +
                              ';UID=' + username + ';PWD=' + password)
        return cnxn
    elif dest_db_type == 'mysql':
        cnxn = pymysql.connect(host=dest_hostname,
                               user=dest_username,
                               password=dest_password,
                               db=target_db)
        return cnxn
    elif dest_db_type == 'postgres':
        cnxn = psycopg2.connect(host=dest_hostname,
                                database="newtestdb",
                                user=dest_username,
                                password=dest_password)
        return cnxn
