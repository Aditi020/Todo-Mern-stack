# Todo Application

A full-stack Todo application that allows users to create, update, delete, and manage their todos. The project is built using the following technologies:

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT for authentication, Zod for validation
- **Frontend:** React with Vite

## Project Setup

The project is organized into two main folders: `Frontend` and `Backend`.

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [npm](https://www.npmjs.com/) installed

## Backend Setup

1. Navigate to the `Backend` folder:
   ```bash
   cd Backend

2. Initialize a new Node.js project:   

```bash
npm init

3. Install the required dependencies:
```bash
npm install

4. Set up your environment variables in a .env file:

JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongo_connection_string
PORT=3000

The backend server will run at http://localhost:3000.

## Frontend Setup

1. Navigate to the Frontend folder:
   ```bash
   cd Frontend

3. Install the required dependencies:
```bash
npm install



## API Endpoints

The backend provides the following API endpoints:

### User Authentication
- **POST /api/users/register** - Register a new user
- **POST /api/users/login** - Login a user

### User Profile
- **GET /api/users/profile** - Get user profile
- **PUT /api/users/profile** - Update user profile
- **DELETE /api/users/profile** - Delete user profile
- **POST /api/users/profile/password** - Change user password

### Todos
- **GET /api/users/todos** - Get all todos of the logged-in user
- **POST /api/users/todos** - Create a new todo
- **PUT /api/users/todos/:id** - Update a specific todo
- **DELETE /api/users/todos/:id** - Delete a specific todo

## Features

- User registration and login with JWT-based authentication
- CRUD operations for todos
- Zod validation for request payloads
- Separate routes and controllers for better code organization



## Technologies Used

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JSON Web Token (JWT)
- Zod (Validation)
- CORS

### Frontend
- React
- Vite
- Axios (or Fetch API for making API requests)

## Future Improvements

- Implement password hashing for better security
- Add user authentication to the frontend
- Enhance UI/UX in the frontend
- Add more features such as due dates, priority levels, etc., to the Todo application

## License

This project is licensed under the MIT License.
