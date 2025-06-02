const { ObjectId } = require('mongodb');
const { getDatabase } = require('../database');
const { STATUS_CODE } = require('../constants/statusCode');

const collectionName = 'authors';

async function getAllAuthors(req, res) {
  try {
    const db = getDatabase();
    const authors = await db.collection(collectionName).find().toArray();
    res.status(STATUS_CODE.OK).json(authors);
  } catch (err) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch authors.' });
  }
}

async function addAuthor(req, res) {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({ error: 'Missing firstName or lastName' });
  }

  try {
    const db = getDatabase();
    const result = await db.collection(collectionName).insertOne({ firstName, lastName });
    res.status(STATUS_CODE.CREATED).json({ insertedId: result.insertedId });
  } catch (err) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Failed to add author.' });
  }
}

async function updateAuthor(req, res) {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({ error: 'Invalid author ID' });
  }

  try {
    const db = getDatabase();
    const result = await db.collection(collectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: { firstName, lastName } }
    );

    if (result.matchedCount === 0) {
      return res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Author not found' });
    }

    res.status(STATUS_CODE.OK).json({ modified: result.modifiedCount > 0 });
  } catch (err) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update author.' });
  }
}

module.exports = {
  getAllAuthors,
  addAuthor,
  updateAuthor
};
