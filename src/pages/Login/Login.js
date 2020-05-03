import React, { useState } from "react";
import "./Losgin.scss";

import { Container, Row, Col, Button } from "react-bootstrap";
import BasicModal from "../../components/modals/BasicModal";
import SignUpForm from "../../components/SignUpForm";
import SignInForm from "../../components/SignInForm";

import JWT_IMG from "./JWT.png";
import GO_IMG from "./Go.png";
import MONGO_IMG from "./MongoLogo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPeace,
  faUsers,
  faAlignLeft,
} from "@fortawesome/free-solid-svg-icons";

import useAuth from "../../hooks/useAuth";
import { Redirect } from "react-router-dom";

export default function Login() {
  const user = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState(null);

  const openModal = (content) => {
    setShowModal(!showModal);
    setContent(content);
  };

  return user ? (
    <Redirect to="/" />
  ) : (
    <>
      <Container className="Login" fluid>
        <Row>
          <Left />
          <Right openModal={openModal} setShowModal={setShowModal} />
        </Row>
      </Container>
      <BasicModal show={showModal} setShow={setShowModal}>
        {content}
      </BasicModal>
    </>
  );
}

const Left = () => (
  <Col className="Login__left" xs={6}>
    <div>
      <h1>
        <FontAwesomeIcon icon={faHandPeace} />
        Users Posts
      </h1>
      <h2>
        <FontAwesomeIcon icon={faUsers} />
        Sigue a gente
      </h2>
      <h2>
        <FontAwesomeIcon icon={faAlignLeft} />
        Publica
      </h2>
    </div>

    <div className="info">
      <h2>Es una aplicación web de prueba que utiliza:</h2>

      <h3>
        <img src={JWT_IMG} alt="JWT_LOGO" />
        Json Web Token para la autenticación de usuarios
      </h3>
      <h3>
        <img src={GO_IMG} alt="GO_LOGO" />
        Una API REST en Golang
      </h3>
      <h3>
        <img src={MONGO_IMG} alt="MONGODB_LOGO" />
        Base de datos NoSQL en MongoDB
      </h3>
    </div>
  </Col>
);

const Right = (props) => (
  <Col className="Login__right" xs={6}>
    <div>
      <h1 className="logo">
        <FontAwesomeIcon icon={faHandPeace} />
      </h1>
      <h1>Entra ahora mismo</h1>
      <Button
        variant="success"
        onClick={() =>
          props.openModal(<SignInForm setShowModal={props.setShowModal} />)
        }
      >
        Iniciar Sesión
      </Button>
      <Button
        variant="outline-success"
        onClick={() =>
          props.openModal(<SignUpForm setShowModal={props.setShowModal} />)
        }
      >
        Regístrate
      </Button>
    </div>
  </Col>
);
