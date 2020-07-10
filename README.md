# Fukeiin日本風景印API
## API online Demo:
https://zencoding.buzz/api/{replace "end point" here, please check API document below}
## Desciption
日本郵局直徑36mm以內的戳印， 刻畫著當下時分的當地風情活動，<br />
## API document線上文件說明：
https://hackmd.io/xlRPaA4MQvuW8BQrCL2sOQ?both
#### Backend: 
- Node.JS - version 10.13.5 up
- Express - version 4.17.1
- Multer - version 1.4.2
#### Database:
- MySQL
- ORM: Sequelize - version 5.21.1

## Getting Started
#### Installation
1. clone project:
```
$ git clone https://github.com/1984-zen/postmark-side-project.git
$ cd postmark-side-project
```
2. To install node module, run:
```
$ npm install
```
3. To migrate schema
```
$ npx sequelize db:migrate
```
#### Start a seerver
4. This project defalt listen 3000 port, run:
```
$ npm start
```