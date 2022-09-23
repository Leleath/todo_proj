// require('dotenv').config();

// const mysql = require('mysql2');
const express = require('express');
const app = express();
app.use(express.json());

// const Parse = require('parse');
// Parse.initialize("XogTF2OtNScZ2orqYj7at7VantSZIq9RvlTKiC1B", "SnZhZuzuxU0kjWYD4FzE8uVzRzRFnpGg16aOdzO3");

// без понятия что это, но это помогает
const cors = require('cors');
app.use(cors({
  origin: '*'
}));

// Присваивания порта по стенду проекта
let port = (process.env.DEBUG == "dev") ? 3000 : process.env.PORT;
console.log(port);


app.get('/', (req, res) => {
  res.json({message:'lul'})
})

app.listen(port, (err) => {
  // Остановить, если ошибка
  if (err) throw err;

  // require('./routes.js')(app, db);

  console.log('api server started');
})


// Создание подключения к БД
// let db = mysql.createConnection({
//   host: process.env.MYSQLHOST,
//   user: process.env.MYSQLUSER,
//   database: process.env.MYSQLDATABASE,
//   password: process.env.MYSQLPASSWORD,
//   port: process.env.MYSQLPORT
// });

// (проверка) Подключение к БД
// db.connect(function(err) {
//   // Остановить, если ошибка
//   if (err) throw err;

//   console.log('DB connected');

//   // Подключение файла с API
//   require('./routes.js')(app, db);

//   // Создание прослушки сервера
//   app.listen(port, (err) => {
//     // Остановить, если ошибка
//     if (err) throw err;

//     console.log('api server started');
//   })
// })