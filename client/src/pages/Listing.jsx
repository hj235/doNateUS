import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import { Card, CardMedia, Typography, Button, IconButton } from '@mui/material';
import { Favorite, Share } from '@mui/icons-material';
import media_ph from '../assets/listing-media-placeholder.jpg';
import profile_ph from '../assets/profile-placeholder.jpg';
import { useUserContext } from '../../hooks/useUserContext';
import { EditDialog } from '../components/EditDialog';
import { LikeButton } from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function Listing() {
    const { user } = useUserContext();
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await axios.get(`/api/listings/${id}`);
                setListing(response.data);
            } catch (error) {
                console.error('Error fetching listing:', error);
            }
        };

        fetchListing();
    }, [id]);

    const handleEditClick = () => {
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    if (!listing) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
            <CircularProgress />
        </Box>;
    }

    const isOwner = user && listing.owner._id === user._id;

    return (
        <Box marginTop={8} marginLeft={30} marginRight={30} display={'flex'} flexDirection={'column'}>
            <Box>
                <Card>
                    <CardMedia component="img" height="500" image={media_ph} alt="Listing Image" />
                </Card>
            </Box>

            <Box display="flex" flexDirection="row" width="100%">
                <Box flex={7} padding={2}>
                    <Box>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left', marginTop: 8 }}>
                            <CardMedia component="img" sx={{ borderRadius: '50%', width: 60, height: 60, marginRight: 1 }}
                                image={listing.owner.profilePicture || profile_ph}
                            />
                            <Typography variant="h6"> {listing.owner.name} </Typography>
                        </div>
                    </Box>

                    <Typography variant={'h2'} marginTop={2}> {listing.title} </Typography>
                    <Typography variant="h6" marginTop={2}>{listing.description}</Typography>
                </Box>

                <Box flex={3} padding={2} display="flex" flexDirection="column" alignItems="flex-end">
                    <LikeButton listing={listing} />
                    <IconButton> <Share color="primary" /> </IconButton>
                    {isOwner && (
                        <Box>
                            <Button variant="contained" color="primary" sx={{ maxWidth: '100%', width: '100%', marginBottom: 1 }} onClick={handleEditClick}> Edit </Button>
                            <DeleteButton listingId={id} />
                        </Box>
                    )}
                </Box>
            </Box>
            <EditDialog open={editDialogOpen} onClose={handleEditDialogClose} user={user} listing={listing} setListing={setListing} />
        </Box>
    );
}

export default Listing;
