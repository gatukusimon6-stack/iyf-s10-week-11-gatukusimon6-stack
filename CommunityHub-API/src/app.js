const express = require('express');
const logger = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');
const routes = require('./routes');

const app = express();

// THIS MUST COME FIRST
app.use(express.json());

// Then other middleware
app.use(logger);

// Then routes
app.use('/api', routes);

// Error handlers last
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;