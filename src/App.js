// import React, { useState, useEffect } from "react";
// import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./utils/contexts";
import { isUserLogedAPI } from "./api/auth";
import React, { useEffect, useState } from "react";
import Router from "./routes/Router";
import Login from "./pages/Login";

export default function App() {
  const [user, setUser] = useState(null);
  const [inicio, setInicio] = useState(true);

  useEffect(() => {
    setUser(isUserLogedAPI());
    setInicio(false);
  }, []);

  if (inicio) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {user ? <Router /> : <Login />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}
