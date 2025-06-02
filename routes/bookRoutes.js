const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  addBook,
  deleteBook
} = require('../controllers/bookControllers');

router.get('/', getAllBooks);

router.post('/', addBook);

router.delete('/:id', deleteBook);

module.exports = router;
