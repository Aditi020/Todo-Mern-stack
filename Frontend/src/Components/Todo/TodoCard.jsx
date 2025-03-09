import React, { useState, useRef } from 'react';
import { Row, Col, Card, CardTitle, CardText, Button } from 'reactstrap';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBack2Line } from "react-icons/ri";
import { ReactSketchCanvas } from 'react-sketch-canvas';
import './Todo.css';

const TodoCard = ({ title, body, type, onEdit, onDelete, index }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef();

  const handleCancel = () => {
    setIsDrawing(false);
    // Clear any unsaved drawing changes
    if (type === 'drawing') {
      canvasRef.current?.clearCanvas();
    }
  };

  return (
    <Card body className='Card'>
      <CardTitle tag="h5" className="d-flex justify-content-between align-items-center">
        <span className="text-truncate">{title}</span>
        <span className="badge bg-secondary">{type === 'drawing' ? '🎨 Drawing' : '📝 Text'}</span>
      </CardTitle>

      <CardText className="position-relative" style={{ minHeight: '10px' }}>
        {type === 'drawing' ? (
          <img
            src={body}
            alt="Drawing"
            className="drawing-preview"
          />
        ) : (
          <div className="text-content">{body}</div>
        )}
      </CardText>

      <Row className="mt-3">
        <Col xs="6">
          <Button
            // color="info"
            block
            onClick={onEdit}
            className="d-flex align-items-center justify-content-center"
          >
            <FiEdit className="mr-2" /> Edit
          </Button>
        </Col>
        <Col xs="6">
          <Button
            color="danger"
            block
            onClick={onDelete}
            className="d-flex align-items-center justify-content-center"
          >
            <RiDeleteBack2Line className="mr-2" /> Delete
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default TodoCard;