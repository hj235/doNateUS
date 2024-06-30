import React, { useEffect, useState } from 'react';
import { Container, Box, CircularProgress, Typography, Paper } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ListingCard } from '../components/ListingCard';
import { FilterSelect } from '../components/FilterSelect';
import { SearchBar } from '../components/SearchBar';

export default function Discover() {
  document.title = "Discover";

  const [listings, setListings] = useState([]);
  const [searchedListings, setSearchedListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('/api/listings');

        if (response.status === 200) {
          setIsLoading(false);
          setListings(response.data);
        } else {
          console.error('Response not okay:', response.status, response.data);
          toast.error("Response not okay");
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
        toast.error('Error fetching listings');
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    setSearchedListings(listings.filter(listing =>
      listing.title.toLowerCase().includes(searchInput.toLowerCase())
    ));
  }, [searchInput, listings]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <Container maxWidth>


      <Box display="flex" flexDirection="row" gap={5}>
        <Box>
          <Box>
            <SearchBar searchInput={searchInput} handleSearchInputChange={handleSearchInputChange} />
          </Box>
          <Box flexBasis="10%">
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h4" gutterBottom>Filters</Typography>
              <FilterSelect searchedListings={searchedListings} setFilteredListings={setFilteredListings} />
            </Paper>
          </Box>
        </Box>



        <Box flexBasis="90%">
          <Box display="flex" flexWrap="wrap" gap={2}>
            {isLoading
              ? <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                <CircularProgress />
              </Box>
              : filteredListings.map(listing => (
                <Box key={listing._id} mb={1}>
                  <ListingCard listing={listing} />
                </Box>
              ))
            }
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
