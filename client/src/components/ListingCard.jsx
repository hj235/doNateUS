import React from 'react';
import { Card, CardContent, CardMedia, Typography, LinearProgress, CardActionArea } from '@mui/material';
import { ListingCardButtons } from './ListingCardButtons';
import { Link } from 'react-router-dom';
import media_ph from '../assets/listing-media-placeholder.jpg';
import profile_ph from '../assets/profile-placeholder.jpg';
import dayjs from 'dayjs';


export function ListingCard({ listing }) {

    const hasGoal = listing.target_balance !== 0 && listing.target_balance !== null;
    const tracked = listing.type === "Fundraiser" || listing.type === "Recruitment";

    const calculateDaysRemaining = (deadline) => {
        const now = dayjs();
        const end = dayjs(deadline);
        return end.diff(now, 'day');
    };

    const daysRemaining = calculateDaysRemaining(listing.deadline);

    return (
        <Card sx={{ width: 280, height: 450, position: 'relative', textAlign: 'center' }}>

            <CardActionArea component={Link} to={`/listing/${listing._id}`} sx={{ height: 450, textDecoration: 'none' }}>
                {tracked && (
                    <React.Fragment>
                        <LinearProgress
                            variant="determinate"
                            sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 25 }}
                            value={(listing.current_balance / listing.target_balance) * 100}
                        />
                        <Typography
                            variant="h7"
                            sx={{ position: 'absolute', top: 0, left: 0, right: 0, color: 'white' }}
                        >
                            {listing.type === 'Fundraiser' ? (
                                hasGoal ? `$${listing.current_balance}/$${listing.target_balance} raised` :
                                    `$${listing.current_balance} raised`
                            ) : (
                                hasGoal ? `${listing.current_balance}/${listing.target_balance} slots taken` :
                                    `${listing.current_balance} slots taken`
                            )}
                        </Typography>
                    </React.Fragment>
                )}

                <CardMedia component="img" height="200" image={listing.media || media_ph} />
                <CardContent>
                    <Typography variant="h5"> {listing.title} </Typography>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                        <CardMedia component="img" sx={{ borderRadius: '50%', width: 30, height: 30, marginRight: 1 }} image={listing.owner.profilePicture || profile_ph}
                        />
                        <Typography variant="body2"> {listing.owner.name} </Typography>
                    </div>
                    <Typography variant="body2" sx={{ display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>
                        {listing.description}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <ListingCardButtons sx={{ position: 'absolute', bottom: 0 }} listing={listing} />objectFit

            <CardContent sx={{ position: 'absolute', bottom: 8, width: '100%', textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: daysRemaining > 0 ? 'gray' : 'red' }}>
                    {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Project has ended'}
                </Typography>
            </CardContent>


        </Card>
    );
}
