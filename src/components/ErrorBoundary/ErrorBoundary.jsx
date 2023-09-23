import React from "react";
import { Navigate } from "react-router-dom";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(`error from ErrorBoundary: ${error}
    error info: ${errorInfo}`);
  }


  render() {
    if (this.state.hasError) {
      // hard refresh if id is wrong or localStorage has been cleared
      setTimeout(() =>  window.location.reload(), 1000);
     return <Navigate to="/" />
    }

    return this.props.children;
  }
}