import React from "react";
import "./Avatar.scss";

import { API_HOST } from "../../../utils/constants";
import avatarDefault from "../../../assets/avatarDefault.png";

export default function Avatar(prorps) {
  const { user } = prorps;
  const avatarUrl = user?.avatar
    ? `${API_HOST}/getAvatar?id=${user.id}`
    : avatarDefault;

  return <img src={avatarUrl} alt="user Avatar" className="avatar" />;
}
