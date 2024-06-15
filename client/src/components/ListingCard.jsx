// experimenting with using cards for listings
import React from 'react';
import { Card, CardContent, CardMedia, CardActions, Button, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom'
import media_ph from '../assets/listing-media-placeholder.jpg';

export function ListingCard({ listing }) {
    // return (
    //     <div className="listing-details">
    //       <div className="media">
    //         {listing.media && <img src={listing.media} alt="Listing Media" className="listing-media" />}
    //       </div>
    //       <Link to={`/listing/${listing._id}`}>{listing.title}</Link>
    //       <div className="user-profile">
    //         {listing.owner.profilePicture && <img src={listing.owner.profilePicture} alt="User Profile" className="user-profile-pic" />}
    //         <p>{listing.owner.name}</p>
    //       </div>
    //       <p><strong></strong>{listing.description}</p>
    //       <p><strong>Status: </strong>{listing.status}</p>
    //     </div>
    // );
    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea component={Link} to={`/listing/${listing._id}`} sx={{ height: 340 }}>
                <CardMedia sx={{ height: 170 }} image={listing.media || media_ph} alt="Listing Media" />
                    <CardContent>
                        <Typography variant="h5" component="div" >
                            {listing.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {listing.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}