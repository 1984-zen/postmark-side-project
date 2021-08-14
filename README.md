![](https://github.com/1984-zen/postmark-side-project/blob/dev/public/postmark-side-project-screen_shoot.gif)
# Fukeiin 日本風景印 API
## 關於這個 Site Project:
我是負責 Fukeiin 日本風景印的後端部分，負責開立 API 以及與前端 (Android) 及設計 (UI Designer) 一起開會溝通.
這個 Site Project 目的是想要讓使用者可以手機拍照自行上傳自己蓋的風景印，還可以收藏別人蓋的風景印，集結同好互相交流以及完整收集所有的日本風景印在自己的 app 上.<br />
## [規劃第一版 API 文件](https://hackmd.io/xlRPaA4MQvuW8BQrCL2sOQ)
## 安裝環境
- Node.js - 安裝前系統需具備 version 10.13.5 以上版本
- Express - version 4.17.1
- MySQL 5.7
## 如何在 Linux / Windows 安裝本專案
### 1. 下載
```
$ git clone https://github.com/1984-zen/postmark-side-project.git
$ cd postmark-side-project
```
### 2. 安裝此 Site Project 會用到的套件
```
$ npm install
```
### 3. 設定您的 MySQL 連線
```
$ cd confing
$ mv config.json.example config.json
// 請記得要先在您的 MySQL 建立一個新的 database_name
```
### 4. 建立 DB schema
```
$ npx sequelize db:migrate
```
### 5. 完成，啟動 server
```
$ npm start
```