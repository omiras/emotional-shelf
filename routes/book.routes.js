const express = require('express');
const { getBooks } = require('../controllers/book.controllers');
const router = express.Router();

router.get('/books', getBooks);

module.exports = router;