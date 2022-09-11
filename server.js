// import Routes from './routes.js';
require('dotenv').config();

const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser').json();
const md5 = require('md5');

const app = express();

const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials:true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

let port = (process.env.DEBUG == "dev") ? 3000 : process.env.PORT;
console.log(port);

let db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  database: process.env.MYSQLDATABASE,
  password: process.env.MYSQLPASSWORD,
  port: process.env.MYSQLPORT
});

db.connect(function(err) {
  if (err) throw err;
  console.log('DB connected');

  require('./routes.js')(app, db, bodyParser, md5, process.env.MD5KEY);

  app.listen(port, (err) => {
    if (err) throw err;
    console.log('api server started');
  })
})