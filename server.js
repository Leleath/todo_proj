require('dotenv').config();

const mysql = require('mysql2');
const express = require('express');
const app = express();
app.use(express.json());

// без понятия что это, но это помогает
const cors = require('cors');
// var corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials:true,
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
app.use(cors());

// Присваивания порта по стенду проекта
let port = (process.env.DEBUG == "dev") ? 3000 : process.env.PORT;
console.log(port);

// Создание подключения к БД
let db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  database: process.env.MYSQLDATABASE,
  password: process.env.MYSQLPASSWORD,
  port: process.env.MYSQLPORT
});

// (проверка) Подключение к БД
db.connect(function(err) {
  // Остановить, если ошибка
  if (err) throw err;

  console.log('DB connected');

  // Подключение файла с API
  require('./routes.js')(app, db);

  // Создание прослушки сервера
  app.listen(port, (err) => {
    // Остановить, если ошибка
    if (err) throw err;

    console.log('api server started');
  })
})