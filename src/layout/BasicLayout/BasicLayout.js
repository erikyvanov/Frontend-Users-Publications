import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import LeftMenu from "../../components/LeftMenu/LeftMenu";

import "./BasicLayout.scss";

export default function BasicLayout(props) {
  const { children } = props;
  return (
    <Container className="basic-layout" fluid>
      <Row>
        <Col md={3} className="basic-layout__menu">
          <LeftMenu />
        </Col>
        <Col md={9} className="basic-layout__content">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
