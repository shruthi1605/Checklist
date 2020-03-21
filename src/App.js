import React from 'react';
import logo from './logo.svg';
import './App.css';
import Checklist from './Checklist/Checklist';
import Menu from './Menu/Menu';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container fluid="xs">
        <Row>
          <Col xs lg="1"><Menu></Menu></Col>

          <Col >
            <Checklist />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
