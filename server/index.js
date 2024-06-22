const express = require('express'); //imports the Express framework
const app = express(); // initialize Express application
const dotenv = require('dotenv').config(); // imports dotenv package and invokes config
const cors = require('cors'); // imports cors middleware, allows web app to access resources from different origins
const {mongoose} = require('mongoose'); // imports the Mongoose library, Object Data Modelling library from MongoDB and Node.js
const multer = require('multer'); //imports multer to handle file uploads
const path = require('path')


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

const corsOptions = {
    credentials: true, // allows cookies on the server side
    origin: process.env.CLIENT_URL // allows this client to communicate with the server
};
app.use(cors(corsOptions));
// to parse incoming requests with JSON payloads and make the parsed JSON data available in the 'req.body' of the routes
app.use(express.json({limit: '200mb'}));

const storage = multer.diskStorage({
    destination: (res, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

// sets up routing for application
// TODO: split up into separate routes, example: https://stackoverflow.com/questions/28305120/differences-between-express-router-and-app-get
app.use('/', require('./routes/authroutes'));
app.use('/api/listings', require('./routes/listingroutes'));
app.use('/listing', require('./routes/listingroutes'));

// sets up Express sever to listen for incoming requests on port defined in .env
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));