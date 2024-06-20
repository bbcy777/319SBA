// require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async() => {

    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.ATLAS_URI);
        console.log(`MongoDB Cnnoceted: ${conn.connection.host}`);
    } catch {
        console.error(error)
    }

    // await mongoose.connect(process.env.ATLAS_URI);
    // db.on('error', (e)=> console.log(e));
    // db.on('open', console.log('Connected to Mongo'));
    // db.on('close', ()=> console.log('MongoDB disconnected'));
}

module.exports = connectDB;