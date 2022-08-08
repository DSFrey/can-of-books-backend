'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
const BookModel = require('./models/book.js');

async function seed(){
  await BookModel.create({
    title: 'The Hobbit',
    description: 'A hobbit goes on an unexpected journey',
    status: 'Available'
  })
  await BookModel.create({
    title: 'Green Eggs and Ham',
    description: 'An argument about the quality of breakfast',
    status: 'Available'
  })
  await BookModel.create({
    title: 'The Prince',
    description: 'A political treatise from 16th century Italy',
    status: 'Available'
  })
  console.log('Seeded, closing connection');
  mongoose.disconnect();
  }

  seed();
  