const { param, check } = require('express-validator');
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
    check('title').not().isEmpty().withMessage('Title is required'),
    check('isbn').isLength({ min: 13, max: 13 }).withMessage('ISBN should be between 13 characters'),
    check('price').isFloat({ gt: 0 }).withMessage('Price should be a positive number'),
    check('description').not().isEmpty().withMessage('Description is required').isLength({ max: 4000 }).withMessage('Description can be up to 4000 characters'),
    check('emotions').isArray().withMessage('Emotions should be an array').custom(emotionsArray => {
        const isValid = emotionsArray.every(emotion => validEmotions.includes(emotion));
        if (!isValid) {
            throw new Error('Emotions must be one of the following: ' + validEmotions.join(', '));
        }
        return true;
    }),
]