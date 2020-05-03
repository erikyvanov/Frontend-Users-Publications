import React from "react";
import useAuth from "../../hooks/useAuth";
import { Redirect } from "react-router-dom";

import Home from "../Home";

export default function Root() {
  const user = useAuth();
  console.log(user);
  return user ? <Home /> : <Redirect to="/login" />;
}
