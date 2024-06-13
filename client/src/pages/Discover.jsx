import React, { useEffect, useState } from 'react';
import './Discover.css';
import ListingDetails from '../components/ListingDetails';
import { ListingCard } from '../components/ListingCard';
import axios from 'axios';
import { TextField } from '@mui/material';
import toast from 'react-hot-toast';
import { FilterSelect } from '../components/FilterSelect';
import spinner from '../assets/loading-spinner.gif';


export default function Discover() {
  document.title = "Discover";

  const [listings, setListings] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isloading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('/api/listings');

        if (response.status === 200) {
          // Uncomment to look at the spinner lmao
          // await new Promise(r => setTimeout(r, 5000));
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

  // Search Bar logic
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
      
      <FilterSelect listings={listings} setListings={setListings} />
      
      <br/>
      <div className="listing">
        {isloading
          ? <div className="spinner-container"><img className="spinner" src={spinner} alt="Fetching listings... please wait"/></div>
          : filteredListings.map(listing => (
            <div className="listing-item" key={listing._id}>
              <ListingDetails listing={listing} />
            </div>
          ))
        }
      </div>
      
      <h1>end</h1>
    </div>
  );
}
