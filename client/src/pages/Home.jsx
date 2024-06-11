import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useUserContext } from '../../hooks/useUserContext';

export default function Home() {
  document.title = "Welcome";
  const { user, isLoggedIn } = useUserContext();
  // const welcomeText = isLoggedIn ? ", " + user.name + "!" : " to doNateUS!";

  return (
    <nav>
      {!user && (
        <div className="page-container">
          <h1>Welcome to doNateUS!</h1>
          <div className="link-container">
            <Link to="/login" className="link">Login</Link>
            <Link to="/register" className="link">Create an account</Link>
          </div>
          <h2>Why you should create an account</h2>
          <ul className="benefits-list">
            Like projects and view them whenever
            <br/>
            Add comments on projects
            <br/>
            Receive updates and notifications from projects
          </ul>
          <div className="link-container">
            <Link to="/discover">Browse without an account</Link>
          </div>
        </div>
      )}
      {user && (
        <div className="page-container">
          <h1>Welcome back, {user.name}!</h1>
          <div className="link-container">
            <Link to="/discover">Browse</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
