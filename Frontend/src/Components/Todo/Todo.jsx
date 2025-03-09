import React, { useState, useEffect, useRef } from 'react';
import './Todo.css';
import TodoCard from './TodoCard.jsx';
import { Row, Col, Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { MdBrush, MdTextFields } from "react-icons/md";

const Todo = () => {
  const [showInput, setShowInput] = useState(false);
  const [inputs, setInputs] = useState({ title: '', body: '', type: 'text' });
  const [userTodos, setUserTodos] = useState([]);
  const [publicTodos, setPublicTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (token) fetchUserTodos();
  }, [token]);

  const fetchUserTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/user/profile/todos`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setUserTodos(response.data.todos);
    } catch (error) {
      console.error("Error fetching user todos:", error);
    }
  };

  const handleSaveDrawing = async () => {
    try {
      const dataURL = await canvasRef.current.exportImage('png');
      const newInputs = { ...inputs, body: dataURL, type: 'drawing' };
      await submit(null, newInputs);
    } catch (error) {
      console.error('Error saving drawing:', error);
      toast.error('Failed to save drawing');
    }
  };

  const handleCancelDrawing = () => {
    if (editIndex !== null) {
      // Reset to original values
      const originalTodo = token ? userTodos[editIndex] : publicTodos[editIndex];
      setInputs(originalTodo);
      setIsDrawing(originalTodo.type === 'drawing');
      canvasRef.current?.clearCanvas();
    } else {
      // Reset for new entry
      setInputs({ title: '', body: '', type: 'text' });
      setIsDrawing(false);
      canvasRef.current?.clearCanvas();
    }
    setShowInput(false);
    setEditIndex(null);
    setCurrentTodoId(null);
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (e, customData) => {
    if (e) e.preventDefault();
    const submitData = customData || inputs;

    if (!submitData.title || !submitData.body) {
      toast.warn('Title and content are required');
      return;
    }

    try {
      if (token) {
        if (editIndex !== null) {
          await axios.put(`http://localhost:3000/api/user/todos/${currentTodoId}`, submitData, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          setUserTodos(prev => prev.map(todo =>
            todo._id === currentTodoId ? submitData : todo
          ));
        } else {
          const response = await axios.post(`http://localhost:3000/api/user/todos`, submitData, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          setUserTodos(prev => [...prev, response.data]);
        }
      } else {
        if (editIndex !== null) {
          setPublicTodos(prev => prev.map((todo, i) =>
            i === editIndex ? submitData : todo
          ));
        } else {
          setPublicTodos(prev => [...prev, submitData]);
        }
      }

      setInputs({ title: '', body: '', type: 'text' });
      setShowInput(false);
      setEditIndex(null);
      setCurrentTodoId(null);
      setIsDrawing(false);
      toast.success(`Todo ${editIndex !== null ? 'updated' : 'created'} successfully!`);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const editTodo = (index) => {
    const todo = token ? userTodos[index] : publicTodos[index];
    setInputs(todo);
    setShowInput(true);
    setEditIndex(index);
    setCurrentTodoId(todo?._id);
    setIsDrawing(todo.type === 'drawing');

    // Clear canvas when switching to text mode
    if (todo.type !== 'drawing') {
      canvasRef.current?.clearCanvas();
    }
  };


  const deleteTodo = async (index) => {
    try {
      if (token) {
        await axios.delete(`http://localhost:3000/api/user/todos/${userTodos[index]._id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setUserTodos(prev => prev.filter((_, i) => i !== index));
      } else {
        setPublicTodos(prev => prev.filter((_, i) => i !== index));
      }
      toast.success('Todo deleted!');
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete");
    }
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
            onClick={() => setShowInput(true)}
            onChange={change}
          />

          {showInput && (
            <div className="input-mode-container">
              <div className="mode-switcher mb-3">
                <Button
                  color={!isDrawing ? 'primary' : 'secondary'}
                  onClick={() => setIsDrawing(false)}
                  style={{
                    padding: '8px 16px',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <MdTextFields size={20} /> Text
                </Button>

                <Button
                  color={isDrawing ? 'primary' : 'secondary'}
                  onClick={() => setIsDrawing(true)}
                  className="ms-2"
                  style={{
                    padding: '8px 16px',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <MdBrush size={20} /> Draw
                </Button>
              </div>

              {isDrawing ? (
                <div className="drawing-input">
                  <ReactSketchCanvas
                    ref={canvasRef}
                    style={{ width: '100%', height: '250px' }}
                    strokeWidth={4}
                    strokeColor="black"
                  />
                  <div className="drawing-buttons mt-3">
                    <Button color="primary" onClick={handleSaveDrawing}>
                      Save Drawing
                    </Button>
                    <Button color="secondary" onClick={handleCancelDrawing}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <textarea
                  name="body"
                  value={inputs.body}
                  placeholder="TEXT CONTENT"
                  className="p-2 todo-inputs"
                  onChange={change}
                  rows={5}
                  style={{
                    fontSize: '14px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="button-container d-flex align-items-center">
        {!isDrawing && (
          <button
            className={editIndex !== null ? 'Update-btn' : 'Add-btn'}
            onClick={(e) => submit(e)}
          >
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        )}
      </div>

      <div className='Todo-body'>
        <Row className="todo-list container">
          {(token ? userTodos : publicTodos).map((item, index) => (
            <Col sm="6" md="4" key={token ? item._id : index}>
              <TodoCard
                title={item.title}
                body={item.body}
                type={item.type}
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