const express = require('express');
const { getBooks, getRecommendationsByEmotion } = require('../controllers/book.controllers');
const router = express.Router();

router.get('/books', getBooks);
router.get('/books/recommendations/:emotion', getRecommendationsByEmotion)

module.exports = router;