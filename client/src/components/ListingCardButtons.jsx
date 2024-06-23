import React, { useState } from 'react';
import { CardContent, IconButton, Menu, MenuItem } from '@mui/material';
import { Comment, MoreVert } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import { LikeButton } from './LikeButton.jsx';


export function ListingCardButtons({ listing }) {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const isOwner = user && listing.owner._id === user._id;


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

    // Edit Button
    const handleEditRedirect = () => {
        navigate(`/listing/${listing._id}`);
    }

    // Delete Button (to Link)

    // Report Button (maybe?)

    return (
        <div>
            <CardContent sx={{ position: 'absolute', bottom: 40, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <LikeButton listing={listing} />
                <IconButton onClick={handleListingRedirect}> <Comment /> </IconButton>
                {isOwner && (
                    <IconButton onClick={handleMenuOpen} > <MoreVert /> </IconButton>)}
            </CardContent>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEditRedirect}>Edit</MenuItem>
                <MenuItem onClick={handleListingRedirect}>Delete</MenuItem>
            </Menu>

        </div>

    );
}