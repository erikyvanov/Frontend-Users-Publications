import React from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";

export default function App() {
  // const [user, setUser] = useState(null);
  var user = null;
  return (
    <div>
      {user ? <h1>Estas logueado.</h1> : <Login />}
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
    </div>
  );
}
