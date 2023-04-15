import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // in purpose of dnd
  // <React.StrictMode>
  <HashRouter>
    <App />
  </HashRouter>
  // </React.StrictMode>
);

