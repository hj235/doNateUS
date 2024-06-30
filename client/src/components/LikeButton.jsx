import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useUserContext } from '../../hooks/useUserContext';


export function LikeButton({ listing }) {
    const { user } = useUserContext();
    const [likedListings, setLikedListings] = useState([])
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(listing.likes);
    // Like Button
    useEffect(() => {

        const fetchListings = async () => {
            try {
                const response = await axios.get(`/api/listings/liked/${user._id}`);
                if (response.status === 200) {
                    setLikedListings(response.data);
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

        if (user && likedListings) {
            setIsLiked(likedListings.some(likedListing => likedListing._id === listing._id));

        } else {
            setIsLiked(false);
        }
    }, [user, listing._id]);

    const likeListing = async () => {
        try {
            const response = await axios.post('api/listings/like', {
                userID: user._id,
                listingID: listing._id
            });
            setIsLiked(!isLiked);
            setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
        } catch (error) {
            toast.error("Not Logged In")
            console.error('Error liking listing:', error);
        }
    }

    return (
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <IconButton onClick={likeListing}> <Favorite sx={{ color: isLiked ? 'red' : 'inherit' }} /> </IconButton>
            <Typography> {likeCount} </Typography>
        </Box>
    )
}