/* eslint-disable no-console */
const express = require('express');
const mongoose = require('moongoose');
const dotenv = require('dotenv');

dotenv.config();

// Constants
const BASE_URL = '/api';
const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGODB_URL || '';
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(BASE_URL, (req, res, next) => {

});


// Connecting to MongoDb
mongoose
    .connect(MONGODB_URL).then(() => {
      console.log('Connected to mongoDb');

      app.listen(PORT, () => console.log('Listening on port ' + PORT + ' to mongoDB'));
    }).catch((err) => {
      console.log('Failed to connect to mongodb due to ', err);
      process.exit(1);
    });
