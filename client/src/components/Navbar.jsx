import React from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, IconButton } from '@mui/material';
import { useUserContext } from "../../hooks/useUserContext";
import { useLogout } from '../../hooks/useLogout';
import logo from '../assets/logo.png';

export default function Navbar() {
  const { user } = useUserContext();
  const { logout } = useLogout();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton component={Link} to="/">
            <Box component="img" src={logo} alt="Logo" sx={{ height: 20, width: 100 }} />
          </IconButton>
          <Button component={Link} to="/discover" variant="text" sx={{ color: '#003D7C' }}>
            Discover
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user ? (
            <Button onClick={logout} variant="text" sx={{ color: '#003D7C' }}>
              Logout
            </Button>
          ) : (
            <>
              <Button component={Link} to="/register" variant="text" sx={{ color: '#003D7C' }}>
                Register
              </Button>
              <Button component={Link} to="/login" variant="text" sx={{ color: '#003D7C' }}>
                Login
              </Button>
            </>
          )}
          <Button
            component={Link}
            to="/create"
            variant="contained"
            sx={{
              backgroundColor: "#003D7C",
              color: "white",
              "&:hover": { backgroundColor: "#00539C" },
            }}
          >
            Create
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
