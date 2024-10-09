require("dotenv").config(); 
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI); // Removed deprecated options
        console.log("Connected to MongoDB");

        mongoose.connection.on('error', (err) => {
            console.error('Connection error:', err);
        });

        mongoose.connection.once('open', () => {
            console.log('MongoDB connection established');
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};

module.exports = connectDB;
