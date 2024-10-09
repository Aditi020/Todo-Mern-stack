const { z } = require("zod"); // Import Zod

// Zod validation for user registration
const registerUserSchema = z.object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
});

// Zod validation for user login
const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

// Zod validation for updating user profile
const updateUserProfileSchema = z.object({
    username: z.string().optional(),
    email: z.string().email().optional(),
});

// Zod validation for creating a todo
const createTodoSchema = z.object({
    title: z.string(),
    body: z.string(),
});

// Zod validation for updating a todo
const updateTodoSchema = z.object({
    title: z.string().optional(), 
    body: z.string().optional()
});

module.exports = {
    registerUserSchema,
    loginUserSchema,
    updateUserProfileSchema,
    createTodoSchema,
    updateTodoSchema,
};
