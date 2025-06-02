const { ObjectId } = require('mongodb');
const { getDatabase } = require('../database');
const { STATUS_CODE } = require('../constants/statusCode');

const booksCollection = 'books';
const authorsCollection = 'authors';

// GET /api/books
async function getAllBooks(req, res) {
  try {
    const db = getDatabase();
    const books = await db.collection(booksCollection).aggregate([
      {
        $lookup: {
          from: authorsCollection,
          localField: 'authorId',
          foreignField: '_id',
          as: 'author'
        }
      },
      { $unwind: '$author' },
      {
        $project: {
          title: 1,
          year: 1,
          author: {
            firstName: '$author.firstName',
            lastName: '$author.lastName'
          }
        }
      }
    ]).toArray();

    res.status(STATUS_CODE.OK).json(books);
  } catch (err) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch books.' });
  }
}

// POST /api/books
async function addBook(req, res) {
  const { title, year, authorId } = req.body;

  if (!title || !year || !authorId) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({ error: 'Missing title, year, or authorId' });
  }

  if (!ObjectId.isValid(authorId)) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({ error: 'Invalid authorId' });
  }

  try {
    const db = getDatabase();

    // Sprawdzenie, czy autor istnieje
    const author = await db.collection(authorsCollection).findOne({ _id: new ObjectId(authorId) });
    if (!author) {
      return res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Author not found' });
    }

    const result = await db.collection(booksCollection).insertOne({
      title,
      year,
      authorId: new ObjectId(authorId)
    });

    res.status(STATUS_CODE.CREATED).json({ insertedId: result.insertedId });
  } catch (err) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Failed to add book.' });
  }
}

// DELETE /api/books/:id
async function deleteBook(req, res) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({ error: 'Invalid book ID' });
  }

  try {
    const db = getDatabase();
    const result = await db.collection(booksCollection).deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Book not found' });
    }

    res.status(STATUS_CODE.NO_CONTENT).end(); // 204 – brak treści przy sukcesie
  } catch (err) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete book.' });
  }
}

module.exports = {
  getAllBooks,
  addBook,
  deleteBook
};
