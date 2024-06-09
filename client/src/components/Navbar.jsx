import { Link } from "react-router-dom";
import logo from '../assets/logo.png'; // Import the logo image
import './Navbar.css'; // Import your CSS file for navbar styling

// Todo Change Navbar based on login status

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div>
          <Link to="/" className="navbar-link" ><img src={logo} alt="Logo" className="navbar-logo" /></Link>
          <Link to="/discover" className="navbar-link" >Discover</Link>
        </div>
        <div className="navbar-links">
          <Link to="/register" className="navbar-link">Register</Link>
          <Link to="/login" className="navbar-link">Login</Link>
          <div className="button">
            <Link to="/create" className="navbar-link">Create</Link>
          </div>
        </div>

      </div>
    </nav>
  );
}
