const express = require('express')
const { getBooks, getBooksByEmotion, getRandomRecommendationByEmotion } = require('../controllers/book.controllers');
const { validateEmotion } = require('./book.validations');
const router = express.Router();


router.get('/books', getBooks);
router.get('/books/recommendations/:emotion', validateEmotion,getBooksByEmotion);
router.get('/books/recommendations/:emotion/random', getRandomRecommendationByEmotion)

module.exports = router;