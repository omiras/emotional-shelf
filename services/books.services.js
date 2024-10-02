const Book = require('../models/book.model');

const getBooks = async (emotion) => {
    const query = emotion ? { emotions: { $in: [emotion] } } : {};
    const books = await Book.find(query).limit(20);
    return books;
};

module.exports = { getBooks };
