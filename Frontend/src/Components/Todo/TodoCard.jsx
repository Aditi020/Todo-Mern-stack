import React, { useState, useRef } from 'react';
import { Row, Col, Card, CardTitle, CardText, Button } from 'reactstrap';
import { FiEdit } from "react-icons/fi";
import { MdBrush } from "react-icons/md"; // Correct brush icon import
import { RiDeleteBack2Line } from "react-icons/ri";
import { ReactSketchCanvas } from 'react-sketch-canvas';
import './Todo.css';

const TodoCard = ({ title, body, onEdit, onDelete, onDraw, index }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef();

  const handleSaveDrawing = async () => {
    try {
      const dataURL = await canvasRef.current.exportImage('png');
      onDraw(index, dataURL);
      setIsDrawing(false);
    } catch (error) {
      console.error('Error saving drawing:', error);
    }
  };

  return (
    <Card body className='Card'>
      {isDrawing && <div className="drawing-modal-backdrop" />}

      <CardTitle tag="h5" className="d-flex justify-content-between align-items-center">
        <span className="text-truncate">{title}</span>
      </CardTitle>

      <CardText className="position-relative" style={{ minHeight: '30px' }}>
        {body?.startsWith('data:image') ? (
          <img
            src={body}
            alt="Drawing"
            className="drawing-preview"
          />
        ) : (
            <div className="text-content mb-0 pb-0" >{body}</div>        )}
      </CardText>

      {isDrawing && (
        <div className="drawing-modal">
          <ReactSketchCanvas
            ref={canvasRef}
            width="400px"
            height="300px"
            strokeWidth={4}
            strokeColor="black"
            backgroundImage={body?.startsWith('data:image') ? body : ''}
          />
          <div className="drawing-buttons">
            <Button color="primary" onClick={handleSaveDrawing}>
              Save
            </Button>
            <Button color="secondary" onClick={() => setIsDrawing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <Row className="mt-3">
        <Col>
          <Button className='Fun-btn d-flex align-items-center justify-content-between' onClick={onEdit} >
            Edit
            <FiEdit className="FiEdit ml-2" />
          </Button>
        </Col>
        <Col>
          <Button className='Del-btn Fun-btn d-flex align-items-center justify-content-between' onClick={onDelete} >
            <div className='btn-content'>Delete</div>
            <RiDeleteBack2Line className="ri-delete-back2-line ml-2" />
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default TodoCard;