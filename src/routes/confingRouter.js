import Home from "../pages/Home";
import Login from "../pages/Login";
import Error404 from "../pages/Error404";

export default [
  {
    path: "/",
    exact: true,
    page: Home,
  },
  {
    path: "/login",
    exact: true,
    page: Login,
  },
  {
    path: "*",
    exact: false,
    page: Error404,
  },
];
