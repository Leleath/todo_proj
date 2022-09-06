// import { createServer } from 'http';
import { MongoClient } from 'mongodb'; 
import express from 'express';
import bodyParser from 'body-parser';
import Routes from './routes.js';

// let port = 3000; // process.env.PORT
let port = process.env.PORT;
let app = express();

const mongoURL = 'mongodb://mongo:4zQlaJZR2IDZoER680w1@containers-us-west-29.railway.app:7317';

const client = new MongoClient(mongoURL);
client.connect((err, database) => {
  if (err) return console.log('Connection error: ', err);
  const db = database.db('todo');
  console.log('db loaded');
  // db.collection('users').insertOne({"name": "Vald", "password": "1243"})

  Routes(app, db);
  console.log('api loaded');

  app.listen(port, () => {
    console.log('api server started');
  });
});