const mongoose = require("mongoose");

// Define the Todo schema
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Ensure each todo is associated with a user
    }
}, { timestamps: true }); 

// Create the Todo model
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo; 