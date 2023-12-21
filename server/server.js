const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
require('colors');
dotenv.config();

// connect DB
connectDB();

const app = express();


// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


//user routes
app.use('/user', require('./routes/userRoute'))

// transection routes
app.use('/transection', require('./routes/transectionRoutes'))


// static files
app.use(express.static(path.join(__dirname, '../client/build')))

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`listening on ${port}`);
})