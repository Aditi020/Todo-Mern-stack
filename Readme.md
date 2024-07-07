# MERN TODO List App

This is a TODO List application built using the MERN stack. It allows users to manage their tasks effectively.

## Features
- Anyone can create a todo
- Anyone can see their existing todos
- Anyone can mark a todo as done

## Back End
- Initializes a Node.js project
- Sets up a package.json to manage project dependencies and metadata
- Installed dependencies: express, zod, mongoose

## Front End
- Created a frontend project repository using Vite
- Created two folders:
  - assets folder
  - Components folder
- `app.jsx` defines what is to be displayed in the frontend
- Components folder contains the components required for the frontend
- Assets folder contains the assets required for the frontend

## Prerequisites

Before running the application, ensure you have the following installed:
- Node.js and npm (Node Package Manager)
- MongoDB
- MongoDB Compass (for database management)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/AtharvaKulkarniIT/mern-todo-app.git
```

### 2. Install dependencies

```bash
cd mern-todo-app

# Split the terminal:

# Install backend dependencies
cd todo_backend
npm install

# Install frontend dependencies
cd todo_frontend
npm install
```

### 3. MongoDB Setup

- Open MongoDB Compass
- Create a new database named `Todo`
- Inside the `Todo` database, create a collection named `tasks`

### 4. Server setup for database connection

```bash
PORT=3000  # Port number for the server (you can change it if needed)
MONGO_URI=mongodb+srv://aditikumar2224:AK0MongoDB@cluster0.zie5hxe.mongodb.net/Todo-application  # MongoDB connection URI
```

### 5. Running the App

```bash
# Start the server (from the 'todo_backend' directory)
npm start

# Start the client (from the 'todo_frontend' directory)
npm start
```

The server will run on `http://localhost:3000/todos` and the client on `http://localhost:5173/`.

## Usage

- Open your web browser and go to `http://localhost:3000/todos`.
- You can add, update tasks, mark them as completed, or delete them.

## Contributing

Feel free to contribute to this project by submitting pull requests.

## Libraries Used

### Node
- Description: Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- Installation:
   ```bash
   # No installation needed as Node.js is a runtime environment
   ```

### Express
- Description: Express is a fast, unopinionated, minimalist web framework for Node.js.
- Installation:
   ```bash
   npm install express
   ```

### Mongoose
- Description: Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
- Installation:
   ```bash
   npm install mongoose
   ```

### JSON Web Token (jsonwebtoken)
- Description: JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties.
- Installation:
   ```bash
   npm install jsonwebtoken
   ```

## Using React

If you want to use React for the frontend, you can follow these steps:

1. Install Vite using npm:
   ```bash
   npm create vite@latest
   ```

2. Provide the project name (e.g., "ABC"), choose React as the framework, and select JavaScript as the variant.

3. Change into the project directory:
   ```bash
   cd ABC
   ```

4. Optionally, you can install dependencies:
   ```bash
   npm install
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Once the server is running, you can open your web browser and access the development environment.
```

