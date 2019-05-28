#Acciom Portal
Acciom is a Data quality tool

#Prerequisites
Softwares to be Installed for Acciom:
1)python 3.7.3
2)Spark 2.4.7
3)mysql 8.0.16
4)java

Installing Python:(Ubuntu)
RUN apt-get install -y build-essential python3-dev python3-pip

Installing Python:(Windows)
Download python 3 from https://www.python.org/downloads/

2.Installing Spark:(Ubuntu)
wget http://mirrors.estointernet.in/apache/spark/spark-2.4.0/spark-2.4.0-bin-hadoop2.7.tgz

RUN tar xvf spark-2.4.0-bin-hadoop2.7.tgz
RUN mv spark-2.4.0-bin-hadoop2.7 /usr/local/
RUN rm spark-2.4.0-bin-hadoop2.7.tgz
RUN ln -s /usr/local/spark-2.4.0-bin-hadoop2.7/ /usr/local/spark
ENV SPARK_HOME="/usr/local/spark

Installing Spark:(Windows)
get spark-2.4.3-bin-hadoop2.7.tgz from https://spark.apache.org/downloads.html

3.Installing Mysql(Ubuntu):
RUN apt-get install -y mysql-client unixodbc-dev


Installing Mysql(Windows):
Download (mysql-installer-community-8.0.16.0.msi) from https://dev.mysql.com/downloads/windows/installer/8.0.html  
set system env variable 


#Installing

Steps for Setup Acciom in System (Ubuntu):
RUN mkdir /acciom
WORKDIR /acciom
RUN mkdir logs/
Clone Acciom repository in /acciom directory
RUN pip3 install -r requirements.txt
export FLASK_APP="manage.py"
flask db init 
Python app.py

Steps for Setup Acciom in System (Windows):
RUN mkdir /acciom
WORKDIR /acciom
RUN mkdir logs/
Clone Acciom repository in /acciom directory
RUN pip3 install -r requirements.txt
set FLASK_APP="manage.py"
flask db init 
Python app.py

