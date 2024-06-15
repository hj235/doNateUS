import React, { useEffect, useState } from 'react';
import './Discover.css';
import { ListingCard } from '../components/ListingCard';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FilterSelect } from '../components/FilterSelect';
import { SearchBar } from '../components/SearchBar';
import spinner from '../assets/loading-spinner.gif';

export default function Discover() {
  document.title = "Discover";

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isloading, setIsLoading] = useState(true);

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

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    setFilteredListings(listings.filter(listing =>
      listing.title.toLowerCase().includes(searchInput.toLowerCase())
    ))
  }, [searchInput, listings]);
  return (
    <div className="page-container">
      <SearchBar searchInput={searchInput} handleSearchInputChange={handleSearchInputChange} />
      <br />
      <div className="listing">
        <div className="filter-grid">
          <h2>Filters:</h2>
          <FilterSelect listings={listings} setListings={setListings} />
        </div>
        <div className="listing-grid">
          {isloading
            ? <div className="spinner-container"><img className="spinner" src={spinner} alt="Fetching listings... please wait" /></div>
            : filteredListings.map(listing => (
              <div className="listing-grid-item" key={listing._id}>
                <ListingCard listing={listing} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}