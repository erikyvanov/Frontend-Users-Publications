import React from "react";
import Login from "./pages/Login";

export default function App() {
  // const [user, setUser] = useState(null);
  var user = null;
  return <div>{user ? <h1>Estas logueado.</h1> : <Login />}</div>;
}
