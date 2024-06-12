import { Link } from "react-router-dom";
import logo from '../assets/logo.png'; // Import the logo image
import './Navbar.css'; // Import your CSS file for navbar styling
import { useUserContext } from "../../hooks/useUserContext";
import { useLogout } from '../../hooks/useLogout';
import { Button } from '@mui/material';

export default function Navbar() {
  const { user } = useUserContext();
  const { logout } = useLogout();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div>
          <Link to="/" className="navbar-link" ><img src={logo} alt="Logo" className="navbar-logo" /></Link>
          <Link to="/discover" className="navbar-link" >Discover</Link>
        </div>
        <div className="navbar-links">
          <div>
            {user
              ? (<Button onClick={logout} variant="text" sx={{ color: 'darkgray', '&:hover': { color: "black", userSelect: "none" } }}> Logout </Button>)
              : (<div className="navbar-link">
                  <Link to="/register" className="navbar-link">Register</Link>
                  <Link to="/login" className="navbar-link">Login</Link>
                </div>)
            }
          </div>
          <div className="button">
            <Link to="/create" className="navbar-link">Create</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
