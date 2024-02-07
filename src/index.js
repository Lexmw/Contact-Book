import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import EditContactPage from "./EditContactPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/edit/:phone" element={<EditContactPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<App/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
