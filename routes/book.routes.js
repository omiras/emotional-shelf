const express = require('express');
const { getBooks, getRecommendationsByEmotion, getRandomRecommendationByEmotion, postBook } = require('../controllers/book.controllers');
const { validateEmotion, validatePostData } = require('./book.validations');
const router = express.Router();


router.get('/books', getBooks);
router.get('/books/recommendations/:emotion', validateEmotion, getRecommendationsByEmotion)
router.get('/books/recommendations/:emotion/random', validateEmotion, getRandomRecommendationByEmotion)
router.post('/books', validatePostData, postBook);

module.exports = router;