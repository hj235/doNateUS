import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useUserContext } from '../../hooks/useUserContext';
import { Box, Typography, Button } from '@mui/material';
import { EditProfile } from '../components/EditProfile';
import { LikedListings } from '../components/LikedListings';
import { ProfileCard } from '../components/ProfileCard';

export default function Home() {
  document.title = "Welcome";
  const { user } = useUserContext();
  // const welcomeText = isLoggedIn ? ", " + user.name + "!" : " to doNateUS!";

  return (
    <div>
      {user
        ? (
          <div className="page-container">
            <Box>
              <Typography variant="h2" marginBottom={2}>
                Welcome back, {user.name}!
              </Typography>

              <ProfileCard user={user} />
              
              <Typography variant="h4" marginBottom={30}>
                Latest Updates & Announcements
              </Typography>
            </Box>

            <EditProfile />
            <Button component={Link} to="/discover" variant="contained">
              Browse
            </Button>
            
            <h2>Liked Listings</h2>
            <LikedListings />
          </div>
        )
        : (
          <div className="page-container">
            <h1>Welcome to doNateUS!</h1>
            <div className="link-container">
              <Link to="/login" className="link">Login</Link>
              <Link to="/register" className="link">Create an account</Link>
            </div>
            <h2>Why you should create an account</h2>
            <ul className="benefits-list">
              Like projects and view them whenever
              <br />
              Add comments on projects
              <br />
              Receive updates and notifications from projects
            </ul>
            <div className="link-container">
              <Link to="/discover">Browse without an account</Link>
            </div>
          </div>
        )
      }
    </div>
  );
}
