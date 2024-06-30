import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CardMedia, Box, Typography, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import media_ph from '../assets/listing-media-placeholder.jpg';
dayjs.extend(relativeTime);

export function Updates({ liked_listings }) {
    const [updates, setUpdates] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUpdate, setSelectedUpdate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [visibleUpdates, setVisibleUpdates] = useState(3); // Number of updates to initially show

    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                if (!liked_listings || liked_listings.length === 0) {
                    setLoading(false);
                    return; // Exit early if liked_listings is not defined or empty
                }

                // Fetch all updates from all liked listings
                const promises = liked_listings.map(async (listingId) => {
                    const response = await axios.get(`/api/listings/${listingId}`);
                    const listing = response.data;

                    if (listing.updates && listing.updates.length > 0) {
                        // Fetch each update individually based on its ID
                        const updatePromises = listing.updates.map(async (updateId) => {
                            const updateResponse = await axios.get(`/api/updates/${updateId}`);
                            return {
                                ...updateResponse.data,
                                listing: {
                                    title: listing.title,
                                    media: listing.media
                                }
                            };
                        });

                        const updatesData = await Promise.all(updatePromises);
                        return updatesData;
                    }

                    return [];
                });

                // Flatten updates array and sort by created_at
                const updatesData = await Promise.all(promises);
                const flattenedUpdates = updatesData.flat();
                const sortedUpdates = flattenedUpdates.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                setUpdates(sortedUpdates);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching updates:', error);
                setLoading(false);
            }
        };

        fetchUpdates();
    }, [liked_listings]);

    const handleClickOpen = (update) => {
        setSelectedUpdate(update);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUpdate(null);
    };

    const handleShowMore = () => {
        setVisibleUpdates(visibleUpdates + 5);
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (updates.length === 0) {
        return <Typography variant="body2">No updates available.</Typography>;
    }

    return (
        <Box>
            {updates.slice(0, visibleUpdates).map((update, index) => (
                <Box key={index} display="flex" alignItems="flex-start" marginTop={2}>
                    {update.listing && (
                        <Box flexBasis="20%" mt= {2} mr={2} >
                            <CardMedia component="img" height="100" image={update.listing.media ? update.listing.media[0] : media_ph} />
                        </Box>
                    )}
                    <Box flexBasis="80%" textAlign={'left'}>
                        <Typography variant="h5" gutterBottom>
                            {update.listing.title}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {update.title}
                        </Typography>
                        <Typography variant="body2" gutterBottom style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp:1 , WebkitBoxOrient: 'vertical' }}>
                            {update.description}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" gutterBottom>
                            {`${dayjs(update.created_at).fromNow()}`}
                        </Typography>
                        <Button variant="text" color="primary" onClick={() => handleClickOpen(update)}>
                            See More
                        </Button>
                    </Box>
                </Box>
            ))}
            {updates.length > visibleUpdates && (
                <Button variant="contained" onClick={handleShowMore} sx={{ marginTop: 4 }}>
                Show More
              </Button> 
            )}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                {selectedUpdate && (
                    <>
                        <DialogTitle>{selectedUpdate.title}</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1" gutterBottom>
                                {selectedUpdate.description}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" gutterBottom>
                                {`${dayjs(selectedUpdate.created_at).fromNow()}`}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
}
