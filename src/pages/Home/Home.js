import React from "react";
import useAuth from "../../hooks/useAuth";

import { Redirect } from "react-router-dom";

export default function Home() {
  const user = useAuth();
  console.log(user);
  return user ? <h1>Home</h1> : <Redirect to="/login" />;
}
