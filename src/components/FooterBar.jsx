import React from 'react';
import { Col, Container, Row, Footer } from 'mdbreact';

const FooterBar = () => (
  <Footer color="white" className="my-0 py-3">
    <Container className="text-left black-text">
      <Row>
        <Col sm="6">
          <h4 className="title">Qiiita</h4>
        </Col>
      </Row>
    </Container>
    <div className="footer-copyright text-center white">
      <Container fluid>
        <p className="grey-text">&copy; 2018 kenichi ebinuma</p>
      </Container>
    </div>
  </Footer>
);

export default FooterBar;
