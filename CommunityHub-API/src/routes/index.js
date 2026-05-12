const express = require('express');
const router = express.Router();

const postsRoutes = require('./posts');
// REMOVE OR COMMENT OUT THIS LINE:
// const usersRoutes = require('./users');   ← DELETE THIS

router.use('/posts', postsRoutes);
// REMOVE THIS TOO:
// router.use('/users', usersRoutes);        ← DELETE THIS

// Health check
router.get('/health', (req, res) => {
    res.json({ 
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;