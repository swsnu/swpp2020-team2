# swpp2020-team2
[![Build Status](https://travis-ci.org/swsnu/swpp2020-team2.svg?branch=master)](https://travis-ci.org/swsnu/swpp2020-team2)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2020-team2&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2020-team2)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2020-team2/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2020-team2?branch=master)

Almanac, the calendar service

### Wiki page
[Wiki](https://github.com/swsnu/swpp2020-team2/wiki)

## Environments

### Frontend
* Yarn ????

### Backend
You can also get info from backend/requirements.txt
* Python 3.7.1
* pip 20.1.1
* django 3.1.2
* coverage 5.3
* pylint 2.6.0
* pylint-django 2.3.0
* mysqlclient 2.0.1
* Pillow 7.0.0

## Frontend

### run


### test

## Backend

### run
We expect mysql is installed properly (with mysql-client and mysql-server). Please see https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04 if needed.

First, log in to mysql (by inserting password if needed):
```
mysql -u root -p
```

In mysql, do followings (`mysql>` ):
```
create database almanac_db;
create user "altroot"@"localhost" identified by "";
grant all privileges on * . * to "altroot"@"localhost";
flush privileges;
```

Now we can use `altroot` with blank password for mysql. And do followings:
```

```

The above procedure should be done once. Next time, skip above.

Now, at root repository, type the following commands
```
cd backend
python manage.py migrate
python manage.py runserver
```

### test
At root repository, type the following commands
```
cd backend
coverage run --source='.' manage.py test almanac && coverage report
```
