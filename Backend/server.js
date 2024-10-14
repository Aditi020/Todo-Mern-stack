// Importing required modules and files
require("dotenv").config();
const { createTodo} = require("./type.js"); // Import validation schemas
const connectDB = require('./Config/db.js');
connectDB();

const express = require('express');
const cors = require('cors');

const app = express();

// Middleware setup
app.use(express.json()); // Middleware to parse JSON request bodies

// app.use(bodyParser.json());
//BodyParser is included inside express
// Middleware to parse JSON request bodies (similar to express.json())

app.use(cors()); // Enable CORS for all origins

const errorHandler = require('./Middlewares/Error');
app.use(errorHandler); // Middleware for Error Handling 

const userRoutes = require('./Routes/UserRoute');
app.use('/api/user', userRoutes); // Use user routes for user-related API calls

// If you want to restrict CORS to a specific URL, uncomment the following block:
// app.use(cors({                 
//     origin: "http://localhost:5173/" // Allow requests only from this origin
// }));        
// Note: CORS is useful to prevent unauthorized access from different domains

// Endpoint to create a new todo
// let todos = []; // In-memory storage for todos

// app.post('/todo', async function (req, res) {
//     // Validate request body using Zod validation
//     const createPayload = req.body;
//     const parsePayload = createTodo.safeParse(createPayload); // Validate the incoming payload
//     if (!parsePayload.success) { // If validation fails
//         return res.status(411).json({
//             message: "You sent the wrong input."
//         });
//     } else {
//         // If validation is successful, create a new Todo entry in memory
//         const newTodo = {
//             id: todos.length + 1, // Simple ID assignment
//             title: createPayload.title,
//             description: createPayload.description,
//             completed: false // Set completed to false by default
//         };
//         todos.push(newTodo); // Add the new todo to the in-memory array
//         res.json({
//             msg: "Todo created successfully",
//             todo: newTodo // Return the created todo
//         });
//     }
// });

// // Endpoint to fetch all todos
// app.get('/todos', (req, res) => {
//     res.json(todos); // Return the in-memory todos array
// });

// // Endpoint to mark a todo as completed
// app.put('/todos/:id/completed', (req, res) => {
//     const todoId = parseInt(req.params.id);
//     const todo = todos.find(t => t.id === todoId);

//     if (!todo) {
//         return res.status(404).json({ message: "Todo not found." });
//     }

//     todo.completed = true; // Mark the todo as completed
//     res.json({
//         msg: "Todo marked as completed",
//         todo: todo // Return the updated todo
//     });
// });

// Start the server and listen on port 3000

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/',(req, res)=> {
    res.send('Hello World!');
});


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});