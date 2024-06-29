import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import { Updates } from '../components/Updates';
import background from '../assets/giving-right-reasons.png'; // Import your background image

export default function Home() {
  document.title = "Welcome";
  const { user } = useUserContext();
  const [likedListingsUpdates, setLikedListingsUpdates] = useState([]);
  const [visibleUpdates, setVisibleUpdates] = useState(5); // Number of updates to initially show

  useEffect(() => {
    const fetchLikedListingsUpdates = async () => {
      try {
        if (!user || !user.liked_listings) {
          return; // Exit early if user or liked_listings is undefined
        }

        const likedListingUpdates = [];

        // Fetch updates for each liked listing
        const promises = user.liked_listings.map(async (listingId) => {
          const response = await axios.get(`/api/listings/${listingId}`);
          const listing = response.data;

          if (listing.updates) {
            for (const updateId of listing.updates) {
              const updateResponse = await axios.get(`/api/updates/${updateId}`);
              likedListingUpdates.push(updateResponse.data);
            }
          }
        });

        // Wait for all requests to complete
        await Promise.all(promises);

        // Sort updates by created_at in descending order (latest first)
        likedListingUpdates.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setLikedListingsUpdates(likedListingUpdates);
      } catch (error) {
        console.error('Error fetching liked listings updates:', error);
      }
    };

    if (user) {
      fetchLikedListingsUpdates();
    }
  }, [user]);

  const handleShowMore = () => {
    setVisibleUpdates(visibleUpdates + 5);
  };

  return (
    <Box
      textAlign="center"
      style={{
        backgroundImage: `url(${background})`, // Set the background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '90vh', // Ensure the background covers the entire viewport
        padding: '20px' // Example padding
      }}
    >
      {user ? (
        <Box maxWidth={600} margin="auto" padding={4} bgcolor="rgba(255, 255, 255, 0.8)" borderRadius={8}>
          <Typography variant="h2" marginBottom={2}>
            Welcome back, {user.name}!
          </Typography>
          <Button component={Link} to="/discover" variant="contained" marginBottom={1}>
            Browse
          </Button>
          <Typography variant="h4" marginBottom={4} marginTop={4}>
            Latest Updates & Announcements
          </Typography>

          {likedListingsUpdates.length === 0 ? (
            <Typography>No Updates</Typography>
          ) : (
            likedListingsUpdates.slice(0, visibleUpdates).map((update, index) => (
              <Updates key={update._id || index} update={update} />
            ))
          )}

          {likedListingsUpdates.length > visibleUpdates && (
            <Button variant="contained" onClick={handleShowMore} marginTop={4}>
              Show More
            </Button>
          )}
        </Box>
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
