const { param, body } = require('express-validator');

const allowedEmotions = ['Inspiration', 'Curiosity', 'Escapism', 'Nostalgia', 'Happiness', 'Sadness'];

exports.validateEmotion = [param('emotion').isIn(allowedEmotions).withMessage('Invalid emotion')];

exports.validatePostData = [
    body('title').
        isLength({ max: 30 }).
        withMessage('The title must be less than 30 characters'),
    body('isbn').matches(/^[0-9]{13}$/)
        .withMessage('The ISBN must be a 13-digit number'),
    body('price').
        isCurrency({ require_symbol: false }).withMessage('Provided price is invalid'),
    body('emotions').
        isArray({ min: 1 }).withMessage('Book must include at least 1 emotion'),
    body('emotions').
        isIn(allowedEmotions)


]