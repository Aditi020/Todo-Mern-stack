const jwt = require('jsonwebtoken');
const User = require('../Model/UserModel');
const Todo = require("../Model/TodoModel");

const {
    registerUserSchema,
    loginUserSchema,
    updateUserProfileSchema,
    createTodoSchema,
    updateTodoSchema
} = require('../type.js'); // Import Zod schemas

// Register user
const registerUser = async (req, res) => {
    const parsed = registerUserSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ msg: "Validation failed: " + JSON.stringify(parsed.error.flatten()) });
    }

    const { username, email, password } = parsed.data;

    try {
        const existingUser = await User.findOne({ email }); // Check if user exists
        if (existingUser) throw new Error('User already exists');

        const newUser = new User({ username, email, password }); // Hash the password in the future
        await newUser.save();
        res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(400).json({ msg: err.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    const parsed = loginUserSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ msg: "Validation failed: " + JSON.stringify(parsed.error.flatten()) });
    }

    const { email, password } = parsed.data;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Validate password
        const isMatch = user.password === password; // Adjust this if you're using hashing

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Generate a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        // Respond with user data and token
        return res.json({
            msg: "Login successful",
            token,
            userId: user._id, // Include userId in response
            username: user.username // Include username in response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        res.status(200).json({
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    const parsed = updateUserProfileSchema.safeParse(req.body); // Use the renamed schema
    if (!parsed.success) {
        return res.status(400).json({ msg: "Validation failed: " + JSON.stringify(parsed.error.flatten()) });
    }

    const { username, email } = parsed.data;

    try {
        const updatedUser = await User.findByIdAndUpdate(req.userId, { username, email }, { new: true, runValidators: true });
        if (!updatedUser) throw new Error("User not found");

        res.status(200).json({ msg: "User updated successfully", user: updatedUser });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Delete user profile
const deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.userId);
        if (!user) throw new Error("User not found");

        res.status(200).json({ msg: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Change user password
const changeUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.userId);
        if (!user) throw new Error("User not found");
        if (oldPassword !== user.password) throw new Error("Incorrect current password");

        user.password = newPassword; // Hash new password in the future
        await user.save();
        res.status(200).json({ msg: "Password updated successfully" });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

// Get user todos
const getUserTodos = async (req, res) => {
    try {
        // Fetch the user and populate the 'todos' array
        const user = await User.findById(req.userId).populate('todos');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the todos for the specific user
        res.json({ todos: user.todos });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error });
    }
};

// Create a new Todo
const createTodo = async (req, res) => {
    const parsed = createTodoSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ msg: "Validation failed: " + JSON.stringify(parsed.error.flatten()) });
    }

    try {
        const { title, body } = parsed.data;

        // Create the new Todo
        const newTodo = new Todo({
            title,
            body,
            userId: req.userId, // Assuming you're using the userId from the middleware
        });

        // Save the Todo to the database
        const savedTodo = await newTodo.save();

        // Update the user's todos array
        await User.findByIdAndUpdate(req.userId, {
            $push: { todos: savedTodo._id } // Push the new Todo's ObjectId to the user's todos array
        });

        return res.status(201).json(savedTodo);
    } catch (error) {
        return res.status(500).json({ msg: "Error creating todo", error: error.message });
    }
};

// Update an existing Todo
const updateTodo = async (req, res) => {
    const { id } = req.params; // Get todo ID from the request parameters
    const updatePayload = req.body; // Get update data from request body

    console.log("Incoming update payload:", updatePayload); // Log incoming payload for debugging

    // Validate the incoming payload
    const parsePayload = updateTodoSchema.safeParse(updatePayload);
    if (!parsePayload.success) {
        return res.status(411).json({
            message: "You sent the wrong input.",
            errors: parsePayload.error.flatten() // Log validation errors for debugging
        });
    }

    try {
        // Find the todo and ensure it belongs to the user
        const todo = await Todo.findOne({ _id: id, userId: req.userId });
        if (!todo) {
            return res.status(404).json({ msg: "Todo not found or does not belong to you." });
        }

        // Update the todo with the provided data
        todo.title = updatePayload.title || todo.title;
        todo.body = updatePayload.body || todo.body;
        await todo.save(); // Save the updated todo

        // If you want to ensure the user’s Todo array reflects changes, 
        // you could update it here as well, but generally it should remain unchanged
        res.status(200).json({ msg: "Todo updated successfully", todo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "An error occurred while updating the todo." });
    }
};

// Mark a Todo as completed
const deleteTodo = async (req, res) => {
    const todoId = req.params.id; // Assuming you're passing the ID in the URL

    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: todoId, userId: req.userId }, // Ensure the todo belongs to the user
            { completed: true },
            { new: true } // Return the updated todo
        );

        if (!todo) {
            return res.status(404).json({ msg: "Todo not found or does not belong to the user" });
        }

        res.json({
            msg: "Todo marked as completed",
            todo
        });
    } catch (error) {
        res.status(500).json({ msg: "Error marking todo as completed: " + error.message });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    changeUserPassword,
    getUserTodos,
    createTodo,
    updateTodo,
    deleteTodo
};

