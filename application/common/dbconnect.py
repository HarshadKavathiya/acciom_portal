#  import os
import psycopg2
# from db import db
import pymysql
import pyodbc

from db_config import (SOURCE_DB_USERNAME, SOURCE_DB_PASSWORD, SOURCE_DB_HOSTNAME, \
                       DEST_DB_USERNAME, DEST_DB_PASSWORD, DEST_DB_HOSTNAME)

# TODO: DO THE CONNECTION FOR DIFFRENT DARTABASES.
source_username = SOURCE_DB_USERNAME
source_password = SOURCE_DB_PASSWORD
source_hostname = SOURCE_DB_HOSTNAME

dest_username = DEST_DB_USERNAME
dest_password = DEST_DB_PASSWORD
dest_hostname = DEST_DB_HOSTNAME


def source_db(src_db, src_db_type, src_host=None):
    print("IN dbconnect", src_db_type)
    print(src_host)
    if src_db_type == 'sqlserver':
        server = src_host
        database = src_db
        username = source_username
        password = source_password
        cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server}'
                              ';SERVER=' + server + ';DATABASE=' + database +
                              ';UID=' + username + ';PWD=' + password)
        return cnxn
    elif src_db_type == 'mysql':
        cnxn = pymysql.connect(host=src_host,
                               user=source_username,
                               password=source_password,
                               db=src_db)
        return cnxn
    elif src_db_type == 'postgres':
        cnxn = psycopg2.connect(host=src_host,
                                database="testdb", user=source_username,
                                password=source_password)
        return cnxn


def dest_db(target_db, dest_db_type, dest_host):
    if dest_db_type == 'sqlserver':
        server = dest_host
        database = target_db
        username = dest_username
        password = dest_password
        cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server}'
                              ';SERVER=' + server + ';DATABASE=' + database +
                              ';UID=' + username + ';PWD=' + password)
        return cnxn
    elif dest_db_type == 'mysql':
        cnxn = pymysql.connect(host=dest_host,
                               user=dest_username,
                               password=dest_password,
                               db=target_db)
        return cnxn
    elif dest_db_type == 'postgres':
        cnxn = psycopg2.connect(host=dest_host,
                                database="newtestdb",
                                user=dest_username,
                                password=dest_password)
        return cnxn
