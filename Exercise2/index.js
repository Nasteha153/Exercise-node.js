const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;

const app = express();
app.use(morgan('combined'));

app.use(express.json());
app.use(cors(
{
  ["origin"]: "*", 
}

));

const booksRouter = require('./routes/books');

app.use('/books', booksRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    app.listen(8000, () => {
      console.log('Server running on port 8000');
    });
  })
  .catch((error) => {
    console.log(error);
  });