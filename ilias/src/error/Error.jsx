import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  // Check if there's no error (e.g., when navigating to a valid route)
  if (!error) {
    return (
      <div>
        <h1>Page not found</h1>
        <p>The requested page was not found.</p>
        <a href="/">Go home</a>
      </div>
    );
  }

  // Display error information
  return (
    <div>
      <h1>{error.status || "Error"}</h1>
      <h2>{error.statusText || "Unknown Error"}</h2>
      <p>{error.message || "An unexpected error occurred."}</p>
      <a href="/">Go home</a>
    </div>
  );
};

export default ErrorPage;
