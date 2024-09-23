const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 30,
    },
    isbn: {
        type: String,
        required: true,
        match: /^[0-9]{13}$/,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 4000 // Amazon Kingle Direct Publishing
    },
    emotions: {
        type: [String],
        required: true,
        // TODO: Cómo aún no tengo que crear libros voy a dejar por el momento otras validaciones y consideraciones por tal de acabar la iteración 1
    }

});

const Book = model('book', bookSchema);

module.exports = Book;