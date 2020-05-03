import Root from "../pages/Root";
import Login from "../pages/Login";
import Error404 from "../pages/Error404";

export default [
  {
    path: "/",
    exact: true,
    page: Root,
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
