const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://burrnn007_db_user:TcMPrgiSlN4IQEgZ@cluster.mongodb.net/giftlink';
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('giftlink');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDatabase first.');
  }
  return db;
}

async function closeConnection() {
  await client.close();
  console.log('MongoDB connection closed');
}

module.exports = { connectToDatabase, getDb, closeConnection };
