import React from "react";
import "./UsersCard.scss";

import { Link } from "react-router-dom";

import { API_HOST } from "../../utils/constants";
import avatarDefault from "../../assets/avatarDefault.png";

export default function ListUsers(props) {
  const { user } = props;
  const avatarUrl = user?.avatar
    ? `${API_HOST}/getAvatar?id=${user.id}`
    : avatarDefault;

  return (
    <Link className="usersCard" to={`/${user.id}`}>
      <img src={avatarUrl} alt="user Avatar" className="avatar" />
      <h1>
        {user.name} {user.lastname}
      </h1>
    </Link>
  );
}
