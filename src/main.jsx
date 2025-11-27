// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

import { AgencyProvider } from "./contexts/AgencyContext";
import { PublicUserProvider } from "./contexts/PublicUserContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AgencyProvider>
      <PublicUserProvider>
        <App />
      </PublicUserProvider>
    </AgencyProvider>
  </BrowserRouter>
);
