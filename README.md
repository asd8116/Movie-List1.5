# 我的餐廳清單

運用 Express & MongoDB 打造的網頁，將你有興趣的美食餐廳，填入相關資料後進行收錄，並呈現出店名、料理類別、評分等訊息。

![畫面截圖](https://i.imgur.com/UCaYjxM.jpg)

## Built With

- [MongoDB](https://www.mongodb.com/download-center/community) - Database

* [Node.js](https://nodejs.org/en/) - JavaScript runtime built

- [Express](https://expressjs.com/zh-tw/starter/installing.html) - Node.js web framework

## Installing

###### 如何下載並啟動專案

打開終端機(Terminal)，啟動本地 MongoDB 資料庫

```
mongod --dbpath /Users/[user]/mongodb-data --bind_ip 127.0.0.1
```

再開啟另一個終端機(Terminal)，`Clone` 這個專案，完成後會顯示 Done 訊息

```
git clone https://github.com/asd8116/Rest-List1.5.git
```

從終端機導入目標檔案，並下載工具包

```
npm install
```

依序匯入種子檔案，並用 `ctrl + c` 結束每次匯入

```
node ./models/seeds/usersSeeder.js
node ./models/seeds/restaurantsSeeder.js
```

開啟本地伺服器。

```
node app.js
```

成功連結後，瀏覽器輸入 http://localhost:3000，
網頁即可運行並執行動作。

## Register & Login

###### 有帳號後方可使用網頁功能

- 可進行一般帳密註冊，也可用 Facebook 快速註冊
- 帳號或密碼錯誤時會出現警告
- Login or Logout 皆會有提示

## Features

###### 功能特點

- 可瀏覽全部收藏的餐廳
- 搜尋欄依輸入餐廳名關鍵字，進行查找
- 排序欄依餐廳評分、類別、名稱，進行排序
- 點擊 `添加您喜愛的餐廳` 可填入餐廳的各式資料，可呈現在畫面
- 點擊圖片可瀏覽餐廳的詳細資訊
- 點擊 `編輯` 可修改餐廳的資料
- 點擊 `刪除` 可移除餐廳的內容

## Contributor

[馬振壹 Wanaka](https://github.com/asd8116)
