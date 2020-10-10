import React from "react";
import "./theme/styles.css";
import "./app.css";
import { BrowserRouter as Router } from "react-router-dom";
import { HomePage, NavPage } from "./pages";

function App() {
  return (
    <Router>
      <div className="app">
        <HomePage />
        <NavPage />
      </div>
    </Router>
  );
}

export default App;
