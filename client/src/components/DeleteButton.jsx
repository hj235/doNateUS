import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import toast from 'react-hot-toast';

export function DeleteButton({ listingId }) {
    const navigate = useNavigate();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`/api/listings/delete/${listingId}`);
            toast.success("Listing deleted successfully");
            navigate('/');  // Redirect to home page or any other relevant page after deletion
        } catch (error) {
            toast.error("Error deleting listing");
            console.error('Error deleting listing:', error);
        }
    };

    return (
        <>
            <Button variant="contained" color="secondary" sx={{ maxWidth: '100%', width: '100%', marginBottom: 1 }} onClick={handleDeleteClick}>
                Delete
            </Button>

            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this listing?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}