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
mongoose.connection.on('disconnected', () => console.log('Server disconnected from mongoDB'));

// Middleware ---------------------------
// to parse JSON data
app.use(express.json());
// TODO: split up into separate routes, example: https://stackoverflow.com/questions/28305120/differences-between-express-router-and-app-get
app.use('/', require('./routes/routes'));

// listen on port defined in .env
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));