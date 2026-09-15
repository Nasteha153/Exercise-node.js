const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear' },
  { id: 2, title: 'Deep Work', author: 'Cal Newport' },
  { id: 3, title: 'The Power of Habit', author: 'Charles Duhigg' },
  { id: 4, title: 'The 7 Habits of Highly Effective People', author: 'Stephen R. Covey' },
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET one book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// POST a new book
app.post('/books', (req, res) => {
    const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if(!book) {
    return res.status(404).json({ message: 'Book not found' });
  } else {  
  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  res.json(book);
  }
});

// delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookIndex = req.params.id;
  res.send( `Book with ID ${bookIndex} has been deleted`);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


