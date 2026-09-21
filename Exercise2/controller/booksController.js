const Book = require('../models/book');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
// create a new book
exports.createBook = async (req, res) => {
  const book = new Book(req.body);
  const savedBook = await book.save();
  res.status(201).json(savedBook);
}

// update book by id
exports.updateBook = async (req, res) => {
    const { id } = req.params;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// delete book by id
exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};