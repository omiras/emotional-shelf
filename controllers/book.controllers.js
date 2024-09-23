const Book = require('../models/book.model');

// otra forma de exportar varios recursos, ¿cuál os gusta más?
exports.getBooks = async (req, res) => {
    const books = await Book.find().limit(20);

    return res.status(200).json({
        message: "Query executed successfully",
        results: books
    })
}
