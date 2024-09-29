const express = require('express')
const { getBooks, getBooksByEmotion, getRandomRecommendationByEmotion, postNewBook } = require('../controllers/book.controllers');
const { validateEmotion, validateNewBook } = require('./book.validations');
const router = express.Router();


router.get('/books', getBooks);
router.get('/books/recommendations/:emotion', validateEmotion, getBooksByEmotion);
router.get('/books/recommendations/:emotion/random', validateEmotion, getRandomRecommendationByEmotion);
router.post('/books', validateNewBook, postNewBook);

module.exports = router;