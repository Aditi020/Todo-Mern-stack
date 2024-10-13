import React from 'react';
import { Row, Col, Card, CardTitle, CardText, Button } from 'reactstrap';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBack2Line } from "react-icons/ri";

const TodoCard = ({ title, body, onEdit, onDelete }) => {
  return (
    <Card body className='Card'>
      <CardTitle tag="h5">{title}</CardTitle>
      <CardText>{body}</CardText>
      <Row style={{gap:"1px"}}>
        <Col>
          <Button className='Fun-btn d-flex align-items-center justify-content-between' onClick={onEdit} >
            Edit Todo
            <FiEdit className="FiEdit ml-2" />
          </Button>
        </Col>
        <Col>
          <Button className='Del-btn Fun-btn d-flex align-items-center justify-content-between' onClick={onDelete} >
            <div className='btn-content'>Delete Todo</div>
            <RiDeleteBack2Line className="ri-delete-back2-line ml-2" />
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default TodoCard;
