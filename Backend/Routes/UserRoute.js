const express = require("express");
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    changeUserPassword,
    deleteUserProfile,
    createTodo,
    updateTodo,
    deleteTodo,
    getUserTodos
} = require("../Controllers/UserController");

const { userMiddleware } = require("../Middlewares/Auth");

const router = express.Router();

// User registration and login routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// User profile routes with authentication middleware
router.get("/profile", userMiddleware, getUserProfile);
router.put("/profile/update", userMiddleware, updateUserProfile);
router.delete("/profile/delete", userMiddleware, deleteUserProfile);
router.put("/profile/change-password", userMiddleware, changeUserPassword);

// Todo routes with authentication middleware
router.post("/todos", userMiddleware, createTodo);
router.put("/todos/:id", userMiddleware, updateTodo);
router.put("/todos/:id/completed", userMiddleware, deleteTodo);
router.get("/profile/todos", userMiddleware, getUserTodos);

module.exports = router;
