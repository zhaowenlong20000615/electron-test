import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { RouterProvider } from "react-router";
import App from "./App.jsx";
import "./assets/css/all.min.css";
import router from "./router/index.jsx";
import store from './store/index.js';
import "./style.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
