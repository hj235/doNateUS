import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  document.title = "Welcome";

  return (
    <div className="page-container">
      <h1>Welcome to doNateUs</h1>
      <div className="link-container">
        <Link to="/login" className="link">Login</Link>
        <Link to="/register" className="link">Create an account</Link>
      </div>
      <h2>Why you should create an account</h2>
      <ul className="benefits-list">
        <li>Like projects and view them whenever</li>
        <li>Add comments on projects</li>
        <li>Receive updates and notifications from projects</li>
      </ul>
      <div className="link-container">
        <Link to="/discover">Browse without an account</Link>
      </div>
    </div>
  );
}
