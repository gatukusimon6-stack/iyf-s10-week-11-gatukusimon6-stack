const express = require('express');
const mongoose = require('mongoose');  // ← ADD THIS LINE
const router = express.Router();

const postsRoutes = require('./posts');
const authRoutes = require('./auth');

router.use('/posts', postsRoutes);
router.use('/auth', authRoutes);

router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

module.exports = router;