import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useUserContext } from '../../hooks/useUserContext';


export function LikeButton({ listing }) {
    const { user } = useUserContext();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(listing.likes);
    // Like Button
    useEffect(() => {
        
        if (user && user.liked_listings) {
            setIsLiked(user.liked_listings.includes(listing._id));

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