import React, { useEffect, useState } from 'react';
import '../pages/Discover.css';
import { ListingCard } from './ListingCard';
import axios from 'axios';
import toast from 'react-hot-toast';
import spinner from '../assets/loading-spinner.gif';
import { useUserContext } from '../../hooks/useUserContext';

export function LikedListings() {
    const [listings, setListings] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const { user } = useUserContext();

    //Fetch listings from database
    useEffect(() => {
        const fetchListings = async () => {
        try {
            const response = await axios.get(`/api/listings/liked/${user._id}`);

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

    return (
        <div className="listing">
            <div className="listing-grid">
            {isloading
                ? <div className="spinner-container"><img className="spinner" src={spinner} alt="Fetching listings... please wait" /></div>
                : listings.map(listing => (
                <div className="listing-grid-item" key={listing._id}>
                    <ListingCard listing={listing} />
                </div>
                ))
            }
            </div>
        </div>
    )
}