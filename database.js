const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

let database;

const mongoConnect = (callback) => {
  const uri = process.env.MONGO_URI;

  MongoClient.connect(uri)
    .then((client) => {
      console.log("Connected!");
      database = client.db("Library");
      callback();
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB:", error);
    });
};

const getDatabase = () => {
  if (!database) {
    throw new Error("No database found!");
  }

  return database;
};

module.exports = { mongoConnect, getDatabase };
