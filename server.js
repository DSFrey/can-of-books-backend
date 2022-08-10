'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3002;
const Book = require('./models/book.js');

const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

//MONGOOSE CONNECTION
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

//ROUTES
app.get('/books', getBooks);
app.post('/books', postBook);
app.delete('/books/:id',deleteBook);

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

async function postBook(request, response, next) {
  try {
    let newBook = await Book.create(request.body);
    response.status(200).send(newBook);
  } catch (error) {
    next(error);
  }
}

async function deleteBook(request, response, next) {
  try {
    let id = request.params.id
    await Book.findByIdAndDelete(id);
    response.status(200).send('Book has been burned');
  } catch (error) {
    next(error);
  }
}

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
