import React from 'react';
import './Discover.css';
import ListingDetails from '../components/ListingDetails'
import axios from 'axios';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function Discover() {

  document.title = "Discover";

  //TODO: Figure out how to load listings from MongoDB
  const [listings, setListings] = useState([])

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('/api/listings')

        if (response) {
          setListings(response.data);
        } else {
          console.error('Response not okay:', response.status, json);
          toast.error("Response not okay")
        }

      } catch (error) {
        console.error('Error fetching listings:', error);
        toast.error('Error fetching listings')
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="page-container">
      <TextField label='Search' className='search-bar'> Search bar </TextField>
      <br/>
      <div className="listing">
        {listings.map(listing => (
          <div className="listing-item" key={listing._id}>
            <ListingDetails listing={listing} />
          </div>
        ))}
      </div>
      <h1>end</h1>
    </div>
  )
}
