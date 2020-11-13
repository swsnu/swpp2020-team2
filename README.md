# swpp2020-team2
[![Build Status](https://travis-ci.org/swsnu/swpp2020-team2.svg?branch=master)](https://travis-ci.org/swsnu/swpp2020-team2)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2020-team2&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2020-team2)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2020-team2/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2020-team2?branch=master)

Almanac, the calendar service

### Wiki page
[Wiki](https://github.com/swsnu/swpp2020-team2/wiki)

## Environments

### Frontend
You can also get info from frontend/package.json
* @testing-library/jest-dom: 5.11.4
* @testing-library/react: 11.1.0
* @testing-library/user-event: 12.1.10
* axios": 0.21.0
* connected-react-router: 6.8.0
* date-fns: 2.16.1
* history: 4.10.1
* react: 16.13.1
* react-dom: 16.13.1
* react-icons: 3.11.0
* react-redux: 7.2.1
* react-router: 5.2.0
* react-router-dom: 5.2.0
* react-scripts: 3.4.3
* react-tabs: 3.1.1
* redux: 4.0.5
* redux-thunk: 2.3.0
* babel-eslint: 10.1.0
* enzyme: 3.11.0
* enzyme-adapter-react-16: "^1.15.5
* enzyme-to-json: 3.6.1
* eslint: 6.6.0
* eslint-config-airbnb: 18.2.1
* eslint-plugin-import: 2.22.1
* eslint-plugin-jsx-a11y: 6.4.1
* eslint-plugin-react: 7.21.5
* eslint-plugin-react-hooks: 4.2.0

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
At root repository, type the following commands
```
cd frontend
yarn install
yarn start
```

### test
At root repository, type the following commands
```
cd frontend
yarn install
yarn test --coverage --watchAll=false
```

## Backend

### run
We expect mysql is installed properly (with mysql-client and mysql-server). Please see https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04 if needed.

First, log in to mysql (by inserting password if needed):
```
mysql -u root -p
```

In mysql, do followings in mysql (`mysql>` ):
```
create database almanac_db;
create user "altroot"@"localhost" identified by "";
grant all privileges on * . * to "altroot"@"localhost";
flush privileges;
```

Now we can use `altroot` with blank password for mysql. And do followings (this is not needed for unit test alone) also in mysql:
```
use almanac_db;
insert into almanac_university(id, name, domain) values(1, 'Seoul National University', 'snu.ac.kr');
insert into almanac_department(id, name) values(1, 'Computer Science Engineering');
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
