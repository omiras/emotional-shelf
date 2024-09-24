const Book = require('../models/book.model');

// otra forma de exportar varios recursos, ¿cuál os gusta más?
exports.getBooks = async (req, res) => {
    const books = await Book.find().limit(20);
   // console.log(books)

    return res.status(200).json({
        message: "Query executed successfully",
        results: books
    })
}

exports.getBooksByEmotion = async (req,res) => {
    const { emotion } = req.params;
    const validEmotions = ["Inspiration", "Curiosity", "Espacism", "Nostalgia", "Happiness", "Sadness"];

       // Check if the provided emotion is valid
       if (!validEmotions.includes(emotion)) {
        return res.status(400).json({
            error: `Please provide one of the following emotions: ${validEmotions.join(', ')}`
        });
    }
try {
    const books = await Book.find({emotions: emotion}).limit(20);
    return res.status(200).json({
        message: `Query by the emotion: ${emotion} executed successfully`,
        results: books
    })
}
catch (error) {
    res.status(500).json({ error: 'Error fetching books' }); // Handle any errors
}
}