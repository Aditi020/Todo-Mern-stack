import React, { useState } from 'react';
import './Todo.css';
import TodoCard from './TodoCard.jsx';
import { Row, Col } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let session
const Todo = () => {
  const [showTextarea, setShowTextarea] = useState(false);
  const [inputs, setInputs] = useState({ title: '', body: '' });
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track the index of the item being edited

  const showTextareaField = () => {
    setShowTextarea(true);
  };

  // Handle changes in the input fields
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  // Handle form submission
  const submit = (e) => {
    e.preventDefault();

    // Validation: Check if both fields are filled
    if (!inputs.title || !inputs.body) {
      alert('Both fields are required');
      return;
    }

    if (editIndex !== null) {
      // Editing an existing Todo
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = inputs; // Update the Todo at the editIndex position
      setTodos(updatedTodos);
      toast.success('Todo updated successfully!');
    } else {
      // Adding a new Todo
      setTodos([...todos, inputs]);
      toast.success('Todo added successfully!');
    }

    // Clear the inputs and reset edit state
    setInputs({ title: '', body: '' });
    setShowTextarea(false);
    setEditIndex(null); // Reset the edit state
  };

  // Trigger edit mode for a specific Todo
  const editTodo = (index) => {
    const todoToEdit = todos[index];
    setInputs(todoToEdit); // Prefill the input fields with the selected Todo's data
    setShowTextarea(true);
    setEditIndex(index); // Set the index for the item being edited
  };

  // Cancel editing and reset state
  const cancelEdit = () => {
    setInputs({ title: '', body: '' }); // Reset the input fields
    setShowTextarea(false); // Hide textarea if needed
    setEditIndex(null); // Exit the edit mode
  };

  // Delete a specific Todo
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    toast.error('Todo deleted successfully!');
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
          {todos.map((item, index) => (
            <Col sm="6" md="4" key={index}>
              <TodoCard
                title={item.title}
                body={item.body}
                onEdit={() => editTodo(index)} // Pass the edit function for this specific Todo
                onDelete={() => deleteTodo(index)} // Pass the delete function for this specific Todo
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Todo;
