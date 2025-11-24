import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthContextProvider from "./app/AuthProvider.jsx";
import ToastContextProvider from "./components/ToastsNotification/ToastNotification.jsx";

import "./index.scss";
import App from "./app/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ToastContextProvider>
  </StrictMode>
);
