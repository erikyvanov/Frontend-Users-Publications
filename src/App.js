// import React, { useState, useEffect } from "react";
// import Login from "./pages/Login";
// import { ToastContainer } from "react-toastify";
import { AuthContext } from "./utils/contexts";
import { isUserLogedAPI } from "./api/auth";
import React, { useEffect, useState } from "react";
import Router from "./routes/Router";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(isUserLogedAPI());
  }, []);

  return (
    <AuthContext.Provider value={user}>
      <Router />
    </AuthContext.Provider>
  );
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   setUser(isUserLogedAPI());
  // }, []);

  // return (
  //   <AuthContext.Provider value={user}>
  //     {user ? <h1>Estas logueado.</h1> : <Login />}
  //     <ToastContainer
  //       position="top-right"
  //       autoClose={5000}
  //       hideProgressBar
  //       newestOnTop={false}
  //       closeOnClick
  //       rtl={false}
  //       pauseOnFocusLoss
  //       draggable
  //       pauseOnHover
  //     />
  //   </AuthContext.Provider>
  // );
}
