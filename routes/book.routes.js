const express = require('express');
const { getBooks, getBooksByEmotion } = require('../controllers/book.controllers');
const router = express.Router();

router.get('/books', getBooks);
router.get('/books/recommendations/:emotion', getBooksByEmotion);

module.exports = router;