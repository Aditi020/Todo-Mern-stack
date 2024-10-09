const mongoose = require('mongoose');

// User schema definition
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Todo',
        }
    ]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
