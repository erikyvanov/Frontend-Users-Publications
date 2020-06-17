import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPeace,
  faHome,
  faUsers,
  faUser,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

import "./LeftMenu.scss";

import { logoutAPI } from "../../api/auth";
import useAuth from "../../hooks/useAuth";

import PostModal from "../modals/PostModal";

export default function LeftMenu() {
  const [showModal, setShowModal] = useState(false);
  const { user, setUser } = useAuth();

  const logout = () => {
    logoutAPI();
    setUser(null);
  };

  return (
    <div className="left-menu">
      <div className="left-menu__logo" onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={faHandPeace} />
        <h3>Publicar</h3>
      </div>

      <div className="left-menu__container">
        <Link to="/" className="left-menu__b">
          <FontAwesomeIcon icon={faHome} />
          Inicio
        </Link>
        <Link to="/users" className="left-menu__b">
          <FontAwesomeIcon icon={faUsers} />
          Usuarios
        </Link>
        <Link to={`/${user?._id}`} className="left-menu__b">
          <FontAwesomeIcon icon={faUser} />
          Perfil
        </Link>
        <Link onClick={logout} to="/" className="left-menu__logout">
          <FontAwesomeIcon icon={faPowerOff} />
          Salir
        </Link>
      </div>

      <PostModal show={showModal} setShow={setShowModal} />
    </div>
  );
}
