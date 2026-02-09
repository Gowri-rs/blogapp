const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongoDB successfully connected`)
    } catch (error) {
        console.log(`mongodb connection failed:`,error)
    }
}

module.exports= connectDB;