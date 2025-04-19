import { createBrowserRouter, Navigate } from "react-router";
import App from "../App.jsx";
import Album from '../views/Album';
import Home from '../views/Home';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />
      },
      {
        path: "/home",
        Component: Home,
      },
      {
        path: "/album",
        Component: Album,
      },
    ]
  },
  
]);

export default router;