'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
mongoose.connect(process.env.MONGO_URL);

const Book = require('./models/book.js');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


app.get('/books', getBooks);

app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

async function getBooks(request, response, next) {
  try {
    let results = await Book.find();
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}


app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
