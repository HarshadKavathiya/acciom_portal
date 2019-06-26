import pymysql
connection=pymysql.connect(host="172.16.19.156",user="root",password="Akhil@123",db="dest_db", port=3306)
cursor=connection.cursor()
cursor.execute("SELECT count(*) FROM  dest_inventory ")
for i in cursor:
    print(i)
connection.commit()

