import { Link } from "react-router-dom";
import logo from '../assets/logo.png'; // Import the logo image
import './Navbar.css'; // Import your CSS file for navbar styling
import { useUserContext } from "../../hooks/useUserContext";
import { useLogout } from '../../hooks/useLogout';
import { Button, Box } from '@mui/material';

export default function Navbar() {
  const { user } = useUserContext();
  const { logout } = useLogout();

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link to='/'> <Box component="img" src={logo} alt="Logo" sx={{ height: 20, width: 100 }} /> </Link>
          <Button component={Link} to="/discover" className="navbar-link" variant="text"> Discover </Button>
        </Box>
        <div className="navbar-links">
          <div>
            {user
              ? (<Button onClick={logout} className="navbar-link" variant="text"> Logout </Button>)
              : (<div>
                <Button component={Link} to="/register" className="navbar-link" variant="text"> Register </Button>
                <Button component={Link} to="/login" className="navbar-link" variant="text"> Login </Button>
              </div>)
            }
          </div>
          <Button component={Link} to="/create" className="navbar-link" variant="text"
            sx={{ background: "#003D7C", color: "white", "&:hover": { background: "#00539C" } }}
          > Create </Button>
        </div>
      </div>
    </div>
  );
}
