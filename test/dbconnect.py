import pyodbc
from db import db
import pymysql
import os
import psycopg2

# TODO: DO THE CONNECTION FOR DIFFRENT DARTABASES.


def source_db(src_db, src_db_type):
    if src_db_type == 'sqlserver':
        server = 'localhost'
        database = src_db
        username = 'SA'
        password = 'Password@1234'
        cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server + ';DATABASE=' + database + ';UID=' + username + ';PWD=' + password)
        return cnxn
    elif src_db_type == 'mysql':
        cnxn = pymysql.connect(host="localhost", user='Acciom_user', password='Acciomuser', db=src_db)
        return cnxn
    elif src_db_type == 'postgres':
        cnxn = psycopg2.connect(host="localhost", database="testdb", user="postgres", password="test@123")
        return cnxn


def dest_db(target_db, dest_db_type):
    if dest_db_type == 'sqlserver':
        server = 'localhost'
        database = target_db
        username = "SA"
        password = 'Password@1234'
        cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
        return cnxn
    elif dest_db_type == 'mysql':
        cnxn = pymysql.connect(host="localhost", user='Acciom_user', password='Acciomuser', db=target_db)
        return cnxn
    elif dest_db_type == 'postgres':
        cnxn = psycopg2.connect(host="localhost", database="Newtestdb", user="postgres", password="test@123")
        return cnxn
