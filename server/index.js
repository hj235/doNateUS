const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose');

// connect to database
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Error on initial connection to database', err));
// to handle errors after initial connection is established
mongoose.connection.on('error', err => {
    console.log('Error on connection to database', err)
});

// middleware
app.use(express.json());
app.use('/', require('./routes/routes'));

// listen on port 8000
const port = 8000;
app.listen(port, () => console.log(`Sever running on port ${port}`));