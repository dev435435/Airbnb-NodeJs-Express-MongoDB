const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const MONGO_URL =
  "mongodb+srv://USERNAME:PASSWORD@cluster0.craillb.mongodb.net/?appName=Cluster0";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      _db = client.db('Airbnb');
      callback();
    })
    .catch((err) => {
      console.log("Error while connecting to Mongo", err);
    });
}

const getDB = () => {
  if (!_db) {
    throw new Error('Mongo not connected');
  }
  return _db;

}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
