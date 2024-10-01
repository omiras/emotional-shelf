const { param } = require('express-validator');

const allowedEmotions = ['Inspiration', 'Curiosity', 'Escapism', 'Nostalgia', 'Happiness', 'Sadness'];

exports.validateEmotion = [param('emotion').isIn(allowedEmotions).withMessage('Invalid emotion')];

exports.validatePost = []; // TODO: Iteración 4...validar los campos que nos vienen del POST.. RECORDAR que también hay que usar validationREsults en el controlador. Mirar el ejemplo de getRecommendationsByEmotion