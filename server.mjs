// import { createServer } from 'http';
import { MongoClient } from 'mongodb'; 
import express from 'express';
import bodyParser from 'body-parser';
import Routes from './routes.js';
import cors from 'cors';

let DEBUG = false;

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

if (DEBUG) {
  let port = 3000;
} else {
  let port = process.env.PORT;
}

let app = express();

const mongoURL = 'mongodb://mongo:4zQlaJZR2IDZoER680w1@containers-us-west-29.railway.app:7317';

const client = new MongoClient(mongoURL);
client.connect((err, database) => {
  if (err) return console.log('Connection error: ', err);
  const db = database.db('todo');
  console.log('db loaded');

  Routes(app, db);
  console.log('api loaded');

  app.listen(port, () => {
    console.log('api server started');
  });
});