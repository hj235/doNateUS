import React, { useEffect, useState } from 'react';
import './Discover.css';
import ListingDetails from '../components/ListingDetails';
import axios from 'axios';
import { TextField } from '@mui/material';
import toast from 'react-hot-toast';

export default function Discover() {
  document.title = "Discover";

  const [listings, setListings] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchInput.toLowerCase())
  );

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
