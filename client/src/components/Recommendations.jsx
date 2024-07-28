import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ListingCard } from './ListingCard';
import { Box, Button } from '@mui/material';
import spinner from '../assets/loading-spinner.gif';

export function Recommendations({ user }) {
    const [listings, setListings] = useState([]);
    const [liked, setLiked] = useState([]);
    const [loadingLiked, setLoadingLiked] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [visibleListings, setVisibleListings] = useState(3); // Initial number of listings to display
    const [favTags, setFavTags] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get(`/api/listings/liked/${user._id}`);
    
                if (response.status === 200) {
                    setLoadingLiked(false);
                    setLiked(response.data);
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

    const favCmp = (a, b) => {
        return b.count - a.count;
    };

    const getFavoriteTags = () => {
        const tags = {};
        liked.forEach(ls => {
            ls.tags.forEach(tag => {
                if (tags.tag == undefined) {
                    tags.tag = 1;
                } else {
                    tags.tag ++;
                }
            })
        });
        const tagArr = [];
        Object.keys(tags).forEach(tag => tagArr.push({ tag, count: tags.tag }));

        const tagArrSorted = tagArr.toSorted(favCmp);
        return tagArrSorted.slice(0, 3);
    }

    const countSimilarity = (ls) => {
        let count = 0;
        favTags.forEach(tag => {
            if (ls.tags.indexOf(tag) != -1) {
                count++;
            }
        })
        return count;
    }

    const cmp = (a, b) => {
        return b.similarity - a.similarity;
    };

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get('/api/listings');                

                if (response.status === 200) {
                    setIsLoading(false);
                    setFavTags(getFavoriteTags());
                    setListings(response.data.map(ls => ({ ...ls, similarity: countSimilarity(ls) }))
                    .filter(item => user.liked_listings.indexOf(item._id) == -1 && item.status == 'Open')
                    .toSorted(cmp));
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

    useEffect(() => {
        console.log(listings.map(item => item.status));
    }, [listings]);

    // Function to load more listings
    const loadMoreListings = () => {
        setVisibleListings((prevVisible) => prevVisible + 3);
    };

    // Function to filter and display top listings based on visibleListings state
    const displayListings = () => {
        if (isLoading) {
            return <img src={spinner} alt="Loading..." />;
        }

        // Display listings based on visibleListings
        const displayedListings = listings.slice(0, visibleListings);

        return (
            <Box display="flex" flexWrap="wrap" gap={6}>
                {displayedListings.map((listing) => (
                    <Box key={listing._id} mb={1}>
                        <ListingCard listing={listing} />
                    </Box>
                ))}
            </Box>
        );
    };

    return (
        <div>
            {displayListings()}

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