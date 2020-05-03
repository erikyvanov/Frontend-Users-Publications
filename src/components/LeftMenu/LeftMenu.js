import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPeace,
  faHome,
  faUsers,
  faUser,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

import "./LeftMenu.scss";

export default function LeftMenu() {
  return (
    <div className="left-menu">
      <Button className="left-menu__logo" variant="light">
        <FontAwesomeIcon icon={faHandPeace} />
        <h3>Publicar</h3>
      </Button>

      <div className="left-menu__container">
        <Link to="/" className="left-menu__b">
          <FontAwesomeIcon icon={faHome} />
          Inicio
        </Link>
        <Link to="/users" className="left-menu__b">
          <FontAwesomeIcon icon={faUsers} />
          Usuarios
        </Link>
        <Link to="/perfil" className="left-menu__b">
          <FontAwesomeIcon icon={faUser} />
          Perfil
        </Link>
        <Link to="/logout" className="left-menu__b">
          <FontAwesomeIcon icon={faPowerOff} />
          Cerrar Sesión
        </Link>
      </div>
    </div>
  );
}
