const { param, body } = require('express-validator');
const { validEmotions } = require('../controllers/book.controllers');

exports.validateEmotion = [
    param('emotion')
    .customSanitizer((value) => {
        // Normalize the input here
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    })
        .isIn(validEmotions)
        .withMessage('Invalid emotion')
];

// Validation middleware using express-validator
exports.validateNewBook = [
    body('title').
        isLength({ max: 30 }).
        withMessage('The title must be less than 30 characters'),
    body('isbn').matches(/^[0-9]{13}$/).withMessage('ISBN should be between 13 characters'),
    body('price').isCurrency({ require_symbol: false }).withMessage('The provided price is not valid').isFloat({ min: 0 }).withMessage('The price must be a positive number'),
    body('description').not().isEmpty().withMessage('Description is required').isLength({ max: 4000 }).withMessage('Description can be up to 4000 characters'),
    body('emotions').
        isArray({ min: 1 }).withMessage('Book must include at least 1 emotion').isIn(validEmotions).withMessage('The provided emotion is not valid.')
]

