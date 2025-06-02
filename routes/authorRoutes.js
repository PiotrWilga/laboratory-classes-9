const express = require('express');
const router = express.Router();
const {
  getAllAuthors,
  updateAuthor,
  addAuthor
} = require('../controllers/authorControllers');

router.get('/', getAllAuthors);

router.put('/:id', updateAuthor);

router.post('/', addAuthor);

module.exports = router;
