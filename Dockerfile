FROM ubuntu:18.04

RUN apt-get update
RUN apt-get install -y software-properties-common vim curl gcc wget

RUN apt-get update
RUN apt-get install -y build-essential python3-dev python3-pip
RUN apt-get install -y mysql-client unixodbc-dev
RUN apt-get update
RUN apt-get install -y default-jdk

# update pip
RUN python3 -m pip install pip --upgrade
RUN python3 -m pip install PyMySQL

RUN wget http://apachemirror.wuchna.com/spark/spark-2.4.3/spark-2.4.3-bin-hadoop2.7.tgz
RUN tar xvf spark-2.4.3-bin-hadoop2.7.tgz
RUN mv spark-2.4.3-bin-hadoop2.7 /usr/local/
RUN rm spark-2.4.3-bin-hadoop2.7.tgz
RUN ln -s /usr/local/spark-2.4.3-bin-hadoop2.7/ /usr/local/spark
ENV SPARK_HOME="/usr/local/spark"

ENV PYTHONUNBUFFERED 1
RUN mkdir /acciom
WORKDIR /acciom
RUN mkdir logs/
COPY . /acciom/
RUN pip3 install -r requirements.txt
ENV LC_ALL="C.UTF-8"
ENV LANG="C.UTF-8"
ENV FLASK_APP="manage.py"



