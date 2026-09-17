const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/giftlink';
const client = new MongoClient(uri);
const JWT_SECRET = process.env.JWT_SECRET || 'giftlink_secret_key_2024';

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

app.get('/api/gifts', async (req, res) => {
  try {
    const gifts = await db.collection('gifts').find({ available: true }).toArray();
    res.json(gifts);
  } catch (error) {
    console.error('Error fetching gifts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/gifts/:id', async (req, res) => {
  try {
    const { ObjectId } = require('mongodb');
    const gift = await db.collection('gifts').findOne({ _id: new ObjectId(req.params.id) });
    
    if (!gift) {
      return res.status(404).json({ message: 'Gift item not found' });
    }
    
    res.json(gift);
  } catch (error) {
    console.error('Error fetching gift:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/search', async (req, res) => {
  try {
    const { category, query } = req.query;
    
    let filter = { available: true };
    
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ];
    }
    
    const items = await db.collection('gifts').find(filter).toArray();
    res.json(items);
  } catch (error) {
    console.error('Error searching gifts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = {
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };
    
    const result = await db.collection('users').insertOne(newUser);
    
    const token = jwt.sign(
      { userId: result.insertedId, email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: result.insertedId,
        username,
        email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id, email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/user/profile', async (req, res) => {
  try {
    const { userId, username, email } = req.body;
    const { ObjectId } = require('mongodb');
    
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: { username, email } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'GiftLink API is running' });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`GiftLink server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
