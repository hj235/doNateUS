import React, { useState, useEffect } from 'react';
import { CardContent, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Favorite, Comment, MoreVert } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useUserContext } from '../../hooks/useUserContext';


export function ListingCardButtons({ listing }) {

    const navigate = useNavigate();
    const { user } = useUserContext();
    const [isLiked, setIsLiked] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
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

    // Comment Button (to Link)
    const handleListingRedirect = () => {
        navigate(`/listing/${listing._id}`);
    }

    // MoreVert Button
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Edit Button (to Link)

    // Delete Button (to Link)

    // Report Button (maybe?)

    return (
        <div>
            <CardContent sx={{ position: 'absolute', bottom: 40, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <IconButton onClick={likeListing}> <Favorite sx={{ color: isLiked ? 'red' : 'inherit' }} /> </IconButton>
                <Typography> {likeCount} </Typography>
                <IconButton onClick={handleListingRedirect}> <Comment /> </IconButton>
                <IconButton onClick={handleMenuOpen} > <MoreVert /> </IconButton>
            </CardContent>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleListingRedirect}>Edit</MenuItem>
                <MenuItem onClick={handleListingRedirect}>Delete</MenuItem>
            </Menu>

        </div>

    );
}