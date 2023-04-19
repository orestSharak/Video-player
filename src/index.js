import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // in purpose of dnd
  // <React.StrictMode>
  <HashRouter>
    <ErrorBoundary>
    <App />
    </ErrorBoundary>
  </HashRouter>
  // </React.StrictMode>
);

