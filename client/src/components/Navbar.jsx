import { Link } from "react-router-dom";
import logo from '../assets/logo.png'; // Import the logo image
import styles from './Navbar.css'; // Import your CSS file for navbar styling

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-link"><img src={logo} alt="Logo" className="navbar-logo" /> {/* Logo added here */}</Link>
        <div className="navbar-links">
          <Link to="/create" className="navbar-link">Create a Listing</Link>
          <Link to="/register" className="navbar-link">Register</Link>
          <Link to="/login" className="navbar-link">Login</Link>
        </div>
      </div>
    </nav>
  );
}
