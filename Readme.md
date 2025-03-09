# TaskScribe

TaskScribe is a modern, full-stack task management application built with the MERN stack (MongoDB, Express.js, React, and Node.js). It allows users to create, update, and delete tasks, with additional features like drawing notes and a stylish UI.


## Features

- **Create, Update, and Delete Tasks**: Easily manage your tasks with a clean and intuitive interface.
- **Drawing Notes**: Add hand-drawn notes to your tasks using a built-in drawing canvas.
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.
- **Modern UI**: Stylish checkboard grid background with rounded corners for a modern look.
- **User Authentication**: Secure user authentication with JWT (JSON Web Tokens).
- **Toast Notifications**: Real-time feedback for user actions using toast notifications.

---

## Technologies Used

- **Frontend**:
  - React.js
  - Reactstrap (for UI components)
  - React Icons (for icons)
  - React Sketch Canvas (for drawing notes)
  - React Toastify (for notifications)
  - CSS (for styling)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (for database)
  - Mongoose (for MongoDB object modeling)
  - JWT (for authentication)

- **Tools**:
  - Vite (for frontend build tool)
  - Axios (for API requests)
  - ESLint (for code linting)
  - Prettier (for code formatting)

---

## Installation

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Aditi020/TaskScribe.git
   cd TaskScribe
   ```

2. **Install dependencies**:
   - For the backend:
     ```bash
     cd Backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd ../Frontend
     npm install
     ```

3. **Set up environment variables**:
   - Create a `.env` file in the `Backend` directory:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     PORT=3000
     ```
   - Create a `.env` file in the `Frontend` directory (if needed):
     ```env
     VITE_API_BASE_URL=http://localhost:3000
     ```

4. **Run the backend server**:
   ```bash
   cd ../Backend
   npm start
   ```

5. **Run the frontend development server**:
   ```bash
   cd ../Frontend
   npm run dev
   ```

6. **Access the application**:
   Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

---

## Folder Structure

```
TaskScribe/
├── Backend/
│   ├── Config/            # Database configuration
│   ├── Controllers/       # Route controllers
│   ├── Middlewares/       # Authentication and error handling
│   ├── Model/             # MongoDB models
│   ├── Routes/            # API routes
│   ├── server.js          # Backend entry point
│   └── .env               # Environment variables
├── Frontend/
│   ├── public/            # Static assets
│   ├── src/               # React components and logic
│   │   ├── Components/    # Reusable components
│   │   ├── Store/         # Redux store (if used)
│   │   ├── App.jsx        # Main application component
│   │   └── main.jsx       # Frontend entry point
│   └── .env               # Frontend environment variables
├── .gitignore             # Files to ignore in Git
├── README.md              # Project documentation
└── package.json           # Project dependencies and scripts
```

---

## Usage

1. **Create a Task**:
   - Enter a title and description (or draw a note) in the input fields.
   - Click "Add" to save the task.

2. **Edit a Task**:
   - Click the "Edit" button on any task.
   - Update the title or content, then click "Update".

3. **Delete a Task**:
   - Click the "Delete" button on any task to remove it.

4. **Draw a Note**:
   - Switch to "Draw" mode using the toggle button.
   - Use the canvas to draw your note, then click "Save Drawing".

---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Acknowledgments

- [React Icons](https://react-icons.github.io/react-icons/) for the icons.
- [React Sketch Canvas](https://github.com/vinothpandian/react-sketch-canvas) for the drawing functionality.
- [Undraw](https://undraw.co/) for the illustration inspiration.

---

## Contact

For questions or feedback, feel free to reach out:

- **Aditi Kumar**  
- **Email**: [Aditi.24er@gmail.com](mailto:Aditi.24er@gmail.com)  
- **GitHub**: [Aditi020](https://github.com/Aditi020)  
- **LinkedIn**: [Aditi Kumar](https://www.linkedin.com/in/aditi-kumar02242)

```

