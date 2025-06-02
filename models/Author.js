const { ObjectId } = require('mongodb');
const { getDatabase } = require('../database');

const collectionName = 'authors';

async function getAllAuthors() {
  const db = getDatabase();
  return await db.collection(collectionName).find({}).toArray();
}

async function updateAuthorById(id, data) {
  const db = getDatabase();
  const result = await db.collection(collectionName).updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
  return result.modifiedCount > 0;
}

async function addAuthor(author) {
  const db = getDatabase();
  const result = await db.collection(collectionName).insertOne(author);
  return result.insertedId;
}

module.exports = {
  getAllAuthors,
  updateAuthorById,
  addAuthor
};
