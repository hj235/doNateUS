import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, CardActions, Button, LinearProgress, CardActionArea, Menu, MenuItem } from '@mui/material';
import { Favorite, Comment, MoreVert } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import media_ph from '../assets/listing-media-placeholder.jpg';
import profile_ph from '../assets/profile-placeholder.jpg';
import dayjs from 'dayjs';
import axios from 'axios';
import { useUserContext } from '../../hooks/useUserContext';


export function ListingCardButtons({ listing }) {

    const navigate = useNavigate();
    const { user } = useUserContext();
    const [isLiked, setIsLiked] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

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
        } catch (error) {
            console.error('Error liking listing:', error);
        }
    }

    // Comment Button
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

    // Edit Button

    // Delete Button

    // Report Button (maybe?)

    return (
        <div>
            <CardContent sx={{ position: 'absolute', bottom: 40, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <IconButton onClick={likeListing}> <Favorite sx={{ color: isLiked ? 'red' : 'inherit' }} /> </IconButton>
                <Typography> {listing.likes} </Typography>
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