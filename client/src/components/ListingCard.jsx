import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, CardActions, Button, LinearProgress, CardActionArea, Menu, MenuItem } from '@mui/material';
import { Favorite, Comment, MoreVert } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import media_ph from '../assets/listing-media-placeholder.jpg';
import profile_ph from '../assets/profile-placeholder.jpg';
import dayjs from 'dayjs';
import axios from 'axios';
import { useUserContext } from '../../hooks/useUserContext';

export function ListingCard({ listing }) {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const isFundraiserOrRecruitment = listing.type === 'Fundraiser' || listing.type === 'Recruitment';

    const calculateDaysRemaining = (deadline) => {
        const now = dayjs();
        const end = dayjs(deadline);
        return end.diff(now, 'day');
    };

    const daysRemaining = calculateDaysRemaining(listing.deadline);

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

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (user && user.liked_listings) {
            setIsLiked(user.liked_listings.includes(listing._id));
        } else {
            setIsLiked(false);
        }
    }, [user, listing._id]);

    const handleListingRedirect = () => {
        navigate(`/listing/${listing._id}`);
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card sx={{ width: 300, height: 450, position: 'relative' }}>
            <CardActionArea component={Link} to={`/listing/${listing._id}`} sx={{ height: 450, textDecoration: 'none' }}>
                {isFundraiserOrRecruitment && (
                    <React.Fragment>
                        <LinearProgress
                            variant="determinate" sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 24 }}
                            value={(listing.current_balance / listing.target_balance) * 100}
                        />
                        <Typography variant="h7"
                            sx={{ position: 'absolute', color: 'white' }}>
                            {listing.type === 'Fundraiser' ? `$${listing.current_balance}/$${listing.target_balance}` : `${listing.current_balance}/${listing.target_balance}`}
                        </Typography>
                    </React.Fragment>
                )}
                <CardMedia component="img" height="170" image={listing.media || media_ph} />
                <CardContent>
                    <Typography variant="h5" marginTop={-1}> {listing.title} </Typography>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                        <CardMedia component="img" sx={{ borderRadius: '50%', width: 30, height: 30, marginRight: 1 }} image={listing.owner.profilePicture || profile_ph}
                        />
                        <Typography variant="body2"> {listing.owner.name} </Typography>
                    </div>
                    <Typography variant="body2"> {listing.description} </Typography>
                </CardContent>
            </CardActionArea>

            <CardContent sx={{ position: 'absolute', bottom: 40, width: '100%', textAlign: 'center', gap: 1 }}>
            <IconButton sx={{ margin: '0 10px' }} onClick={likeListing}> <Favorite sx={{ color: isLiked ? 'red' : 'inherit' }} /> </IconButton>
                <IconButton sx={{ margin: '0 10px' }} onClick={handleListingRedirect}> <Comment /> </IconButton>
                <IconButton sx={{ margin: '0 10px' }} onClick={handleMenuOpen} > <MoreVert /> </IconButton>
            </CardContent>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
            </Menu>

            <CardContent sx={{ position: 'absolute', bottom: 8, width: '100%', textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: daysRemaining > 0 ? 'gray' : 'red' }}>
                    {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Project has ended'}
                </Typography>
            </CardContent>
        </Card>
    );
}
