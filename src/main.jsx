import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/poppins";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster position="top-right" />
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
