const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: true
}));

// app.use('/api/v1/RESOURCE', require('./routes/resource'));
app.use('/api/v1/habits', require('./routes/habits-router'));
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
