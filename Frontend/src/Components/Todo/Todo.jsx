import React, { useState } from 'react';
import './Todo.css';
import TodoCard from './TodoCard.jsx';
import { Row, Col } from 'reactstrap';

const Todo = () => {
  const [showTextarea, setShowTextarea] = useState(false);
  const [inputs, setInputs] = useState({ title: '', body: '' });
  const [todos, setTodos] = useState([]);

  const showTextareaField = () => {
    setShowTextarea(true);
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();

    // Validation: Check if both fields are filled
    if (!inputs.title || !inputs.body) {
      alert('Both fields are required');
      return; // Stop the function if validation fails
    }

    // Add the new todo if validation passes
    setTodos([...todos, inputs]);
    setInputs({ title: '', body: '' });
    setShowTextarea(false);
  };

  return (
    <div className='todo'>
      <div className="todo-main-container d-flex justify-content-center align-items-center">
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
      <button className="Add-btn display-flex" onClick={submit}>Add</button>

      <div className='Todo-body'>
        <Row className="todo-list container">
          {todos.map((item, index) => (
            <Col sm="6" md="4" key={index}>
              <TodoCard title={item.title} body={item.body} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Todo;
