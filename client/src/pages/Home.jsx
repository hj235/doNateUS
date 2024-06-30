import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import { Box, Typography, Button } from '@mui/material';
import { EditProfile } from '../components/EditProfile';
import { LikedListings } from '../components/LikedListings';
import { ProfileCard } from '../components/ProfileCard';
import { Updates } from '../components/Updates_Home';
import background from '../assets/giving-right-reasons.png';

export default function Home() {
  document.title = "Welcome";
  const { user } = useUserContext();
  // const welcomeText = isLoggedIn ? ", " + user.name + "!" : " to doNateUS!";

  return (
    <Box
      textAlign="center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '90vh',
      }}
    >
      {user ? (
        <Box maxWidth={600} margin="auto" padding={4} bgcolor="rgba(255, 255, 255, 0.8)" borderRadius={4}>
          <Typography variant="h2" marginBottom={2}>
            Welcome back, {user.name}!
          </Typography>

              <ProfileCard user={user} />
              
          <Button component={Link} to="/discover" variant="contained" marginBottom={1}>
            Browse Listings
          </Button>
          <Typography variant="h4" marginBottom={4} marginTop={4}>
            Latest Updates & Announcements
          </Typography>
          <Updates liked_listings={user.liked_listings} />
        </Box>

            <EditProfile />
      ) : (
        <Box maxWidth={600} margin="auto" padding={4} bgcolor="rgba(255, 255, 255, 0.8)" borderRadius={8}>
          <Typography variant="h2" marginBottom={2}>
            Welcome to doNateUS!
          </Typography>
          <Button component={Link} to="/login" variant="contained" sx={{ marginRight: 2 }}>
            Login
          </Button>
          <Button component={Link} to="/register" variant="contained">
            Create an account
          </Button>
            
            <h2>Liked Listings</h2>
            <LikedListings />
          <Box marginTop={2}>
            <Typography variant="body1">
              <Link to="/discover">Browse without an account</Link>
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
