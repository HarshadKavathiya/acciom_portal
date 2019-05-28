# Acciom Portal
Acciom is a Data quality tool

# Prerequisites
Softwares to be Installed for Acciom:
1)python 3.7.3 <br>
2)Spark 2.4.7 <br>
3)mysql 8.0.16 <br>
4)java <br>

#### 1.Installing Python:(Ubuntu)
RUN apt-get install -y build-essential python3-dev python3-pip

#### Installing Python:(Windows)
Download python 3 from https://www.python.org/downloads/

#### 2.Installing Spark:(Ubuntu)
wget http://mirrors.estointernet.in/apache/spark/spark-2.4.0/spark-2.4.0-bin-hadoop2.7.tgz
RUN tar xvf spark-2.4.0-bin-hadoop2.7.tgz <br>
RUN mv spark-2.4.0-bin-hadoop2.7 /usr/local/ <br>
RUN rm spark-2.4.0-bin-hadoop2.7.tgz  <br>
RUN ln -s /usr/local/spark-2.4.0-bin-hadoop2.7/ /usr/local/spark
ENV SPARK_HOME="/usr/local/spark

#### Installing Spark:(Windows) <br>
get spark-2.4.3-bin-hadoop2.7.tgz from https://spark.apache.org/downloads.html <br>
get winutils from  https://github.com/steveloughran/winutils/tree/master/hadoop-2.7.1/bin <br>
mkdir C:\spark <br>
mkdir C:\winutils\bin <br>
Extract downloaded spark in C:\spark <br>
Copy winutils.exe in C:\winutils/bin <br>
Set spark_home = "C:\spark" <br>
Set hadoop_home = "C:\winutils" <br>


#### 3.Installing Mysql(Ubuntu): <br>
RUN apt-get install -y mysql-client unixodbc-dev

#### Installing Mysql(Windows): <br>
Download (mysql-installer-community-8.0.16.0.msi) from https://dev.mysql.com/downloads/windows/installer/8.0.html  

#### 4.Installing Java(Ubuntu):
sudo apt install default-jre <br>
sudo apt install default-jdk 

#### 4.Installing Java(Windows):

get jdk from https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html <br>
Install the downloaded jdk file <br>
go to system env variable click path and add :  C:\ProgramFiles(x86)\java\jdk1.8.xx\bin 



# Installing

Steps for Setup Acciom in System (Ubuntu):<br>
RUN mkdir /acciom  <br>
WORKDIR /acciom <br>
RUN mkdir logs/  <br>
Clone Acciom repository in /acciom directory <br>
RUN pip3 install -r requirements.txt <br>
export FLASK_APP="manage.py" <br>
flask db init <br>
Python app.py

Steps for Setup Acciom in System (Windows):<br>
RUN mkdir /acciom  <br>
WORKDIR /acciom  <br>
RUN mkdir logs/ <br>
Clone Acciom repository in /acciom directory <br>
RUN pip3 install -r requirements.txt <br>
set FLASK_APP="manage.py" <br>
flask db init  <br>
Python app.py 

