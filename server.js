const express = require('express');
const authRoutes = require('./routes/authroutes');
const taskRoutes = require('./routes/taskroutes');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/', taskRoutes);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});