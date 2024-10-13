import React, { useState, useEffect } from 'react';
import './Todo.css';
import TodoCard from './TodoCard.jsx';
import { Row, Col } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Todo = () => {
  const [showTextarea, setShowTextarea] = useState(false);
  const [inputs, setInputs] = useState({ title: '', body: '' });
  const [todos, setTodos] = useState([]); // Public todos
  const [userTodos, setUserTodos] = useState([]); // User-specific todos
  const [editIndex, setEditIndex] = useState(null); // Track the index of the item being edited
  const token = sessionStorage.getItem('token'); // Get the token from session storage
  const userId = sessionStorage.getItem('id'); // Get the user ID from session storage

  useEffect(() => {
    // Fetch user todos if logged in
    if (token && userId) {
      fetchUserTodos();
    }
  }, [token, userId]);

  const fetchUserTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/profile/${userId}/todos`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Use token for authorization
        },
      });
      setUserTodos(response.data.todos); // Set the fetched user todos
      setTodos([]); // Clear public todos upon sign in
    } catch (error) {
      console.error("Error fetching user todos:", error);
    }
  };

  const showTextareaField = () => {
    setShowTextarea(true);
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!inputs.title || !inputs.body) {
      toast.warn('Both fields are required');
      return;
    }

    try {
      if (token && userId) {
        // User is signed in, save the todo to the database with userId
        const response = await axios.post(`http://localhost:3000/api/todos`, {
          title: inputs.title,
          body: inputs.body,
          userId: userId, // Use userId from session storage
        }, {
          headers: {
            'Authorization': `Bearer ${token}`, // Use the JWT token for authorization
          },
        });

        // Add the newly created todo to userTodos
        setUserTodos([...userTodos, response.data]);
        toast.success('Todo created successfully!');
      } else {
        // Show a notification for non-logged in users
        toast.warn("Your task is not saved, please SignUp!");
        // Add to public todos state
        setTodos([...todos, inputs]);
        toast.success('Todo created successfully!');
      }

      setInputs({ title: '', body: '' });
      setShowTextarea(false);
      setEditIndex(null); // Reset the edit state
    } catch (error) {
      console.error("Error creating todo:", error);
      toast.error("Failed to create todo.");
    }
  };

  const editTodo = (index) => {
    const todoToEdit = userTodos[index] || todos[index];
    setInputs(todoToEdit); // Prefill the input fields with the selected Todo's data
    setShowTextarea(true);
    setEditIndex(index); // Set the index for the item being edited
  };

  const cancelEdit = () => {
    setInputs({ title: '', body: '' });
    setShowTextarea(false);
    setEditIndex(null);
  };

  const deleteTodo = (index) => {
    if (token && userId) {
      // Logic for deleting a user-specific todo
      const updatedUserTodos = userTodos.filter((_, i) => i !== index);
      setUserTodos(updatedUserTodos);
      toast.error('User Todo deleted successfully!');
    } else {
      // Logic for deleting a public todo
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
      toast.error('Todo deleted successfully!');
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setTodos([]); // Clear public todos on logout
    setUserTodos([]); // Clear user todos on logout
  };

  return (
    <div className='todo'>
      <ToastContainer />
      <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
        <div className="d-flex flex-column todo-inputs-div">
          <input
            type="text"
            name="title"
            value={inputs.title}
            placeholder="TITLE"
            className='my-3 p-2 todo-inputs'
            onClick={showTextareaField}
            onChange={change}
          />
          {showTextarea && (
            <textarea
              type="text"
              name="body"
              value={inputs.body}
              placeholder="Body"
              className='p-2 todo-inputs textarea-transition'
              onChange={change}
            />
          )}
        </div>
      </div>

      <div className="button-container d-flex align-items-center">
        <button
          className={editIndex !== null ? 'Update-btn display-flex' : 'Add-btn display-flex'}
          onClick={submit}
        >
          {editIndex !== null ? 'Update' : 'Add'}
        </button>

        {editIndex !== null && (
          <button
            className="Cancel-btn display-flex"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}
      </div>

      <div className='Todo-body'>
        <Row className="todo-list container">
          {token && userId ? userTodos.map((item, index) => (
            <Col sm="6" md="4" key={index}>
              <TodoCard
                title={item.title}
                body={item.body}
                onEdit={() => editTodo(index)}
                onDelete={() => deleteTodo(index)}
              />
            </Col>
          )) : todos.map((item, index) => (
            <Col sm="6" md="4" key={index}>
              <TodoCard
                title={item.title}
                body={item.body}
                onEdit={() => editTodo(index)}
                onDelete={() => deleteTodo(index)}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Todo;
