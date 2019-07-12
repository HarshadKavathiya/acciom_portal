import psycopg2
import pymysql
import pyodbc
from sqlalchemy import exc

from application.common.Response import success


def connection_check(db_type, db_hostname, db_username, db_password, db_name):
    try:
        if db_type.lower() == 'mysql':
            cnxn = pymysql.connect(host=db_hostname,
                                   user=db_username,
                                   password=db_password,
                                   db=db_name)
            cursor = cnxn.cursor()
            if cursor:
                return success

        elif db_type.lower() == 'sqlserver':
            server = db_hostname
            database = db_name
            username = db_username
            password = db_password
            cnxn = pyodbc.connect('DRIVER={ODBC Driver 13 for SQL Server}'
                                  ';SERVER=' + server +
                                  ';DATABASE=' + database +
                                  ';UID=' + username + ';PWD=' + password + ';Trusted_Connection=yes;')
            cursor = cnxn.cursor()
            if cursor:
                return success

        elif db_type.lower() == 'postgres':
            cnxn = psycopg2.connect(host=db_hostname,
                                    database=db_name, user=db_username,
                                    password=db_password)
            cursor = cnxn.cursor()
            if cursor:
                return success

    except exc.DatabaseError as e:
        return {"success": False, "message": str(e)}
