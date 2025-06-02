const { ObjectId } = require('mongodb');
const { getDatabase } = require('../database');

const collectionName = 'books';

async function getAllBooks() {
  const db = getDatabase();

  return await db.collection(collectionName).aggregate([
    {
      $lookup: {
        from: 'authors',
        localField: 'author',
        foreignField: '_id',
        as: 'authorDetails'
      }
    },
    {
      $unwind: '$authorDetails'
    }
  ]).toArray();
}

async function addBook(book) {
  const db = getDatabase();

  if (!book.author || !ObjectId.isValid(book.author)) {
    throw new Error("Invalid or missing author ID");
  }

  const newBook = {
    title: book.title,
    year: book.year,
    author: new ObjectId(book.author)
  };

  const result = await db.collection(collectionName).insertOne(newBook);
  return result.insertedId;
}

async function deleteBook(id) {
  const db = getDatabase();
  const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

module.exports = {
  getAllBooks,
  addBook,
  deleteBook
};
