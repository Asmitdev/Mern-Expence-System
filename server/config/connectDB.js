const mongoose = require('mongoose');
require('colors');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Server connection established ${mongoose.connection.host}`.bgCyan.white);

    } catch (error) {
        console.log(`${error}`.bgRed);
    }
}

module.exports = connectDB;