const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectToDatabase } = require('./db');
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', giftRoutes);
app.use('/api', searchRoutes);
app.use('/api', authRoutes);

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
