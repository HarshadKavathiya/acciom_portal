FROM harshad3011/acciom_base

RUN mkdir /acciom
WORKDIR /acciom
RUN mkdir logs/
COPY . /acciom/
RUN pip3 install -r requirements.txt
ENV LC_ALL="C.UTF-8"
ENV LANG="C.UTF-8"
ENV FLASK_APP="manage.py"
