import React from 'react';
import './Discover.css';
import ListingDetails from '../components/ListingDetails'
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react'
import axios from 'axios';

export default function Discover() {

    document.title = "Discover";

    //TODO: Figure out how to load listings from MongoDB
    const [listings, setListings] = useState(null)
    useEffect(() => {
        const fetchListings = async () => {
          try {
            const response = await axios.get('/discover');
            setListings(response.data);
          } catch (error) {
            console.error('Error fetching listings:', error);
          }
        };
    
        fetchListings();
      }, []);

    return (
        <div className="page-container">
            <TextField label='Search' className='search-bar'> Search bar </TextField>
            <div className="listings">
                {listings && listings.map((listing) => ( 
                    <ListingDetails key={listing._id} listing = {listing} />
                ))}
            </div>
        </div>
    )
}
