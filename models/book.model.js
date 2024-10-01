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
        unique: true
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
        enum: ['Inspiration', 'Curiosity', 'Escapism', 'Nostalgia', 'Happiness', 'Sadness'],
        validate: {
            validator: function (value) {
                return value.length > 0;
            },
            message: 'There must be at least one emotion in the list.'
        }
    },

});

const Book = model('book', bookSchema);

module.exports = Book;