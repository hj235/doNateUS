import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button, LinearProgress, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import media_ph from '../assets/listing-media-placeholder.jpg';
import profile_ph from '../assets/profile-placeholder.jpg';
import dayjs from 'dayjs';

export function ListingCard({ listing }) {
    const isFundraiserOrRecruitment = listing.type === 'Fundraiser' || listing.type === 'Recruitment';
    const calculateDaysRemaining = (deadline) => {
        const now = dayjs();
        const end = dayjs(deadline);
        return end.diff(now, 'day');
    };
    const daysRemaining = calculateDaysRemaining(listing.deadline);


    return (
        <Card sx={{ width: 300, height: 450, position: 'relative' }}>
            <CardActionArea component={Link} to={`/listing/${listing._id}`} sx={{ height: 450, textDecoration: 'none' }}>
                {isFundraiserOrRecruitment && (
                    <React.Fragment>
                        <LinearProgress
                            variant="determinate"
                            value={(listing.current_balance / listing.target_balance) * 100}
                            sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 24 }}
                        />
                        <Typography variant="h7"
                            sx={{ position: 'absolute', color: 'white' }}>
                            {listing.type === 'Fundraiser' ?
                                `$${listing.current_balance}/$${listing.target_balance}` :
                                `${listing.current_balance}/${listing.target_balance}`}
                        </Typography>
                    </React.Fragment>
                )}
                <CardMedia component="img" height="170" image={listing.media || media_ph} />
                <CardContent>
                    <Typography variant="h5" marginTop={-1}> {listing.title} </Typography>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                        <CardMedia component="img" sx={{ borderRadius: '50%', width: 30, height: 30, marginRight: 1 }} image={listing.owner.profilePicture || media_ph}
                        />
                        <Typography variant="body2"> {listing.owner.name} </Typography>
                    </div>
                    <Typography variant="body2"> {listing.description} </Typography>
                </CardContent>
                <CardContent sx={{ position: 'absolute', bottom: 8, width: '100%', textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                        {`Category: ${listing.type}`}
                    </Typography>
                    <Typography variant="body2" sx={{ color: daysRemaining > 0 ? 'gray' : 'red' }}>
                        {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Project has ended'}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
