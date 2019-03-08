FROM ubuntu:18.04

RUN apt-get update
RUN apt-get install -y software-properties-common vim curl gcc

RUN apt-get update
RUN apt-get install -y build-essential python3-dev python3-pip
RUN apt-get update
RUN apt-get install -y mysql-client unixodbc-dev


# update pip
RUN python3 -m pip install pip --upgrade
RUN python3 -m pip install PyMySQL

ENV PYTHONUNBUFFERED 1
RUN mkdir /acciom
WORKDIR /acciom
RUN mkdir logs/
COPY . /acciom/
RUN pip3 install -r requirements.txt
ENV LC_ALL="C.UTF-8"
ENV LANG="C.UTF-8"
ENV FLASK_APP="manage.py"