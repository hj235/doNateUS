import { Link } from "react-router-dom";
import logo from '../assets/logo.png'; // Import the logo image
import './Navbar.css'; // Import your CSS file for navbar styling

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src={logo} alt="Logo" className="navbar-logo" /> {/* Logo added here */}
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/register" className="navbar-link">Register</Link>
          <Link to="/login" className="navbar-link">Login</Link>
        </div>
      </div>
    </nav>
  );
}
