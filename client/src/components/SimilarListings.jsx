import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ListingCard } from '../components/ListingCard';
import { Box, Button } from '@mui/material';
import spinner from '../assets/loading-spinner.gif';

export function SimilarListings({ listing }) {
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visibleListings, setVisibleListings] = useState(4); // Initial number of listings to display

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
                toast.error('Error fetching similar listings');
            }
        };

        fetchListings();
    }, []);

    // Function to load more listings
    const loadMoreListings = () => {
        setVisibleListings((prevVisible) => prevVisible + 4);
    };

    // Function to filter and display top listings based on visibleListings state
    const displayListings = () => {
        if (isLoading) {
            return <img src={spinner} alt="Loading..." />;
        }

        // Display listings based on visibleListings
        const displayedListings = listings.slice(0, visibleListings);

        return (
            <Box style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                {displayedListings.map((listing) => (
                    <Box key={listing._id} padding={2}>
                        <ListingCard listing={listing} />
                    </Box>
                ))}
            </Box>
        );
    };

    return (
        <div>
            
            {/* Display listings */}
            {displayListings()}

            {/* See more button */}
            {visibleListings < listings.length && (
                <Box display="flex" justifyContent="center" marginTop={2}>
                    <Button variant="contained" color="primary" onClick={loadMoreListings}>
                        See More
                    </Button>
                </Box>
            )}
        </div>
    );
}
