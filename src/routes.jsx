// import { redirect } from "react-router";
// import { Children } from "react";
// import { Navigate } from "react-router";
import Home from "./components/Home";
import Post from "./components/Post";
import Posts from "./components/Posts";
import LogIn from "./components/LogIn";
import ErrorPage from "./components/ErrorPage";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "posts",
    element: <Posts />,
    errorElement: <ErrorPage />
  },
  {
    path: "posts/:postId",
    element: <Post />,
    errorElement: <ErrorPage />
  },
  {
    path: "log-in",
    element: <LogIn />,
    errorElement: <ErrorPage />
  }
];

export default routes;