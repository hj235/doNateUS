import React, { useEffect, useState, useMemo } from 'react';
import './Discover.css';
import ListingDetails from '../components/ListingDetails';
import axios from 'axios';
import { TextField, MenuItem, Button, Box } from '@mui/material';
import toast from 'react-hot-toast';
import { useSortedByKey } from '../../hooks/useSortedByKey';

export default function Discover() {
  document.title = "Discover";

  const [listings, setListings] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState('');
  const sortOptions = [
    { label: 'Created Date', value: 'created_at' },
    { label: 'Title', value: 'title' },
  ];
  const { sortedByKey } = useSortedByKey();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('/api/listings');

        if (response.status === 200) {
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

  // Search Bar logic
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Sorting Selection logic 
  const handleOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSorting = () => {
    setListings(sortedByKey(listings, sortOption));
    console.log(listings);
  };

  return (
    <div className="page-container">
      <div className='search-bar'>
        <TextField 
          label='Search' 
          fullWidth 
          value={searchInput} 
          onChange={handleSearchInputChange}
        />
      </div>
      <br/>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginLeft: '600px', marginRight: '800px' }}>
        <TextField
          select
          label="Sort by:"
          value={sortOption}
          onChange={handleOptionChange}
          variant="outlined"
          fullWidth
          >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button sx={{ display: 'flex', height: 1, alignSelf: 'center' }} variant="contained" color="primary" onClick={handleSorting}>Apply</Button>
      </Box>
      
      <br/>
      <div className="listing">
        {filteredListings.map(listing => (
          <div className="listing-item" key={listing._id}>
            <ListingDetails listing={listing} />
          </div>
        ))}
      </div>
      <h1>end</h1>
    </div>
  );
}
