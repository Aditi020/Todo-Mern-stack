import React from 'react';
import { Row, Col, Card, CardTitle, CardText, Button } from 'reactstrap';

const TodoCard = ({ title, body }) => {
  return (
    <Card body className='Card'>
      <CardTitle tag="h5">{title}</CardTitle>
      <CardText>{body}</CardText>
      <Button>Mark as completed</Button>
    </Card>
  );
};

export default TodoCard;
