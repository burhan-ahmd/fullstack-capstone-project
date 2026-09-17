const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

router.get('/api/search', async (req, res) => {
  try {
    const db = getDb();
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

module.exports = router;
