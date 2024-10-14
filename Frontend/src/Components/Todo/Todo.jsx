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
  const [userTodos, setUserTodos] = useState([]); // User-specific todos
  const [publicTodos, setPublicTodos] = useState([]); // Public todos for non-signed-in users
  const [editIndex, setEditIndex] = useState(null); // Track the index of the item being edited
  const [currentTodoId, setCurrentTodoId] = useState(null); // To store the ID of the todo being edited
  const token = sessionStorage.getItem('token'); // Get the token from session storage

  useEffect(() => {
    // Fetch user todos if logged in
    if (token) {
      fetchUserTodos();
    }
  }, [token]);

  const fetchUserTodos = async () => {
    try {
      const response = await axios.get(`${window.location.origin}/api/user/profile/todos`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUserTodos(response.data.todos); // Set the fetched user todos
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
      if (token) {
        if (editIndex !== null) {
          // Editing an existing todo
          const response = await axios.put(`${window.location.origin}/api/user/todos/${currentTodoId}`, {
            title: inputs.title,
            body: inputs.body,
          }, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          // Update the state with the edited todo
          setUserTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo._id === currentTodoId ? { ...todo, title: inputs.title, body: inputs.body } : todo
            )
          );

          toast.success('Todo updated successfully!');
        } else {
          // User is signed in, save the todo to the database
          const response = await axios.post(`${window.location.origin}/api/user/todos`, {
            title: inputs.title,
            body: inputs.body,
          }, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          // Add the newly created todo to userTodos
          setUserTodos((prevTodos) => [...prevTodos, response.data]);
          toast.success('Todo created successfully!');
        }
      } else {
        // Add to public todos state
        setPublicTodos((prevTodos) => [...prevTodos, inputs]);
        toast.success('Todo created successfully!');
      }

      // Clear the input fields and reset state
      setInputs({ title: '', body: '' });
      setShowTextarea(false);
      setEditIndex(null);
      setCurrentTodoId(null);
    } catch (error) {
      console.error("Error creating/updating todo:", error);
      if (error.response) {
        toast.error(`Failed: ${error.response.data.message || "An error occurred."}`);
      } else {
        toast.error("Failed to create/update todo. Network error.");
      }
    }
  };

  const editTodo = (index) => {
    const todoToEdit = token ? userTodos[index] : publicTodos[index];
    setInputs(todoToEdit); // Prefill the input fields with the selected Todo's data
    setShowTextarea(true);
    setEditIndex(index); // Set the index for the item being edited
    setCurrentTodoId(todoToEdit._id); // Store the ID of the todo being edited
  };

  const cancelEdit = () => {
    setInputs({ title: '', body: '' });
    setShowTextarea(false);
    setEditIndex(null);
    setCurrentTodoId(null);
  };

  const deleteTodo = async (index) => {
    if (token) {
      const todoToDelete = userTodos[index];
      try {
        await axios.delete(`${window.location.origin}/api/user/todos/${todoToDelete._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // Remove the deleted todo from state
        setUserTodos((prevTodos) =>
          prevTodos.filter((_, i) => i !== index)
        );
        toast.success('Todo deleted successfully!');
      } catch (error) {
        console.error("Error deleting todo:", error);
        if (error.response) {
          toast.error(`Failed to delete todo: ${error.response.data.message || "An error occurred."}`);
        } else {
          toast.error("Failed to delete todo. Network error.");
        }
      }
    } else {
      // Logic for deleting a public todo
      setPublicTodos((prevTodos) =>
        prevTodos.filter((_, i) => i !== index)
      );
      toast.success('Public Todo deleted successfully!');
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUserTodos([]); // Clear user todos on logout
    setPublicTodos([]); // Clear public todos on logout
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
          {token ? userTodos.map((item, index) => (
            <Col sm="6" md="4" key={item._id}> {/* Using item's _id as the key */}
              <TodoCard
                title={item.title}
                body={item.body}
                onEdit={() => editTodo(index)}
                onDelete={() => deleteTodo(index)}
              />
            </Col>
          )) : publicTodos.map((item, index) => (
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
