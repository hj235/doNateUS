import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function Updates({ announcementIds }) {
    const [updates, setUpdates] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUpdate, setSelectedUpdate] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                if (!announcementIds || announcementIds.length === 0) {
                    setLoading(false);
                    return; // Exit early if announcementIds is not defined or empty
                }

                const promises = announcementIds.map(async (announcementId) => {
                    const response = await axios.get(`/api/updates/${announcementId}`);
                    return response.data;
                });
                const updatesData = await Promise.all(promises);
                setUpdates(updatesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching updates:', error);
                setLoading(false);
            }
        };

        fetchUpdates();
    }, [announcementIds]);

    const handleClickOpen = (update) => {
        setSelectedUpdate(update);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUpdate(null);
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (updates.length === 0) {
        return <Typography variant="body2">No updates available.</Typography>;
    }

    return (
        <Box>
            {updates.map((update) => (
                <Box key={update._id} marginTop={2}>
                    <Typography variant="h6" gutterBottom>
                        {update.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {update.description}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" gutterBottom>
                        {`${dayjs(update.created_at).fromNow()}`} {/* Displaying "days ago" */}
                    </Typography>
                    <Button variant="text" color="primary" onClick={() => handleClickOpen(update)}>
                        See More
                    </Button>
                </Box>
            ))}

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                {selectedUpdate && (
                    <>
                        <DialogTitle>{selectedUpdate.title}</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1" gutterBottom>
                                {selectedUpdate.description}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" gutterBottom>
                                {`${dayjs(selectedUpdate.created_at).fromNow()}`} {/* Displaying "days ago" */}
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
