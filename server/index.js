const express = require('express'); //imports the Express framework
const dotenv = require('dotenv').config(); // imports dotenv package and invokes config
const cors = require('cors'); // imports cors middleware, allows web app to access resources from different origins
const {mongoose} = require('mongoose'); // imports the Mongoose library, Object Data Modelling library from MongoDB and Node.js

const app = express(); // initialize Express application

// Database ----------------------------

// connect to database
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Error on initial connection to database', err));

// to handle errors after initial connection is established
mongoose.connection.on('error', err => {
    console.log('Error on connection to database', err)
});

// disconnect message
mongoose.connection.on('disconnected', () => console.log('Server disconnected from mongoDB'));

// Middleware ---------------------------

// to parse incoming requests with JSON payloads and make the parsed JSON data available in the 'req.body' of the routes
app.use(express.json());

// sets up routing for application
// TODO: split up into separate routes, example: https://stackoverflow.com/questions/28305120/differences-between-express-router-and-app-get
app.use('/', require('./routes/routes'));

// sets up Express sever to listen for incoming requests on port defined in .env
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));