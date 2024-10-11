import React from 'react';
import { Row, Col, Card, CardTitle, CardText, Button } from 'reactstrap';

const TodoCard = ({ title, body }) => {
  return (
    <Card body className='Card'>
      <CardTitle tag="h5">{title}</CardTitle>
      <CardText>{body}</CardText>
      <Row>
     <Col ><Button className='Fun-btn'> Edit Todo</Button></Col>
        <Col > <Button className='Fun-btn'>Delete Todo</Button></Col> 
      </Row>
    </Card>
  );
};
export default TodoCard;
