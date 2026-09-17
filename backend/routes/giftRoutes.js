const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

router.get('/api/gifts', async (req, res) => {
  try {
    const db = getDb();
    const gifts = await db.collection('gifts').find({ available: true }).toArray();
    res.json(gifts);
  } catch (error) {
    console.error('Error fetching gifts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/api/gifts/:id', async (req, res) => {
  try {
    const db = getDb();
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

module.exports = router;
