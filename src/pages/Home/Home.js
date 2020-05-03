import React from "react";
import useAuth from "../../hooks/useAuth";

export default function Home() {
  const user = useAuth();
  console.log(user);
  return <h1>Home</h1>;
}
