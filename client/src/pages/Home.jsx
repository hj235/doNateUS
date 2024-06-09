import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import './Home.css';

// Create UI for the welcome page

export default function Home() {

  document.title = "Welcome";

  return (
    <div className="page-container">
      <h1 sx={{userSelect: "none" }} >Welcome to doNateUs</h1>
      <Link to="/discover" variant="button" sx={{userSelect: "none" }}> Browser without account</Link>
      <Link to="/login" variant="button" sx={{userSelect: "none" }}> Login </Link>
      <Link to="/register" variant="button" sx={{userSelect: "none" }}> Create an account</Link>
    </div>
  )
}
