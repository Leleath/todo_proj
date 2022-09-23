// require('dotenv').config();

// const mysql = require('mysql2');
const express = require('express');
const app = express();
app.use(express.json());

// без понятия что это, но это помогает
const cors = require('cors');
app.use(cors({
  origin: '*'
}));

let port = process.env.PORT;
console.log(port);

app.listen(port, (err) => {
  // Остановить, если ошибка
  if (err) throw err;

  // Подключение API
  require('./routes.js')(app);

  console.log('api server started');
})