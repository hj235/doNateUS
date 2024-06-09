import { Link } from "react-router-dom";
import logo from '../assets/logo.png'; // Import the logo image
import './Navbar.css'; // Import your CSS file for navbar styling
import { useUserContext } from "../../hooks/useUserContext";

// Todo Change Navbar based on login status

export default function Navbar() {
  const { user } = useUserContext();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div>
          <Link to="/" className="navbar-link" ><img src={logo} alt="Logo" className="navbar-logo" /></Link>
          <Link to="/discover" className="navbar-link" >Discover</Link>
        </div>
        <div className="navbar-links">
          <nav>
            {user && (
              <div className="navbar-link">
                <Link to="/logout" className="navbar-link">Logout</Link>
              </div>
            )}
            {!user &&(
              <div className="navbar-link">
                <Link to="/register" className="navbar-link">Register</Link>
                <Link to="/login" className="navbar-link">Login</Link>
              </div>
            )}
          </nav>
          <div className="button">
            <Link to="/create" className="navbar-link">Create</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
