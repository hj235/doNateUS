import React, { useState } from 'react';
import { Dialog, Button, DialogActions, DialogTitle, DialogContent, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

export function EditButton({ listing, onSave }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: listing.title,
        description: listing.description,
        type: listing.type,
        status: listing.status,
        deadline: listing.deadline ? new Date(listing.deadline).toISOString().substr(0, 16) : '',
        current_balance: listing.current_balance,
        target_balance: listing.target_balance,
        media: listing.media,
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSaveChanges = async () => {
        try {
            const response = await axios.patch(`/api/listings/update/${listing._id}`, formData);
            console.log('Updated data:', response.data);
            onSave(response.data);
            handleClose();
        } catch (error) {
            console.error('Error updating listing:', error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained" color="primary" sx={{ maxWidth: '100%', width: '100%', marginBottom: 1}} onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit Listing</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" variant="standard" id="title" name="title" label="Title" fullWidth value={formData.title} onChange={handleChange} />
                    <TextField margin="dense" variant="standard" id="description" name="description" label="Description" fullWidth multiline rows={8} value={formData.description} onChange={handleChange} />
                    <TextField margin="dense" variant="standard" id="deadline" name="deadline" label="Deadline" type="datetime-local" fullWidth value={formData.deadline} onChange={handleChange} />
                    <FormControl fullWidth margin="dense" variant="standard">
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select labelid="type-label" id="type" name="type" value={formData.type} onChange={handleChange}>
                            <MenuItem value="Fundraiser">Fundraiser</MenuItem>
                            <MenuItem value="Recruitment">Recruitment</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense" variant="standard">
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select labelid="status-label" id="status" name="status" value={formData.status} onChange={handleChange}>
                            <MenuItem value="Open">Open</MenuItem>
                            <MenuItem value="Closed">Closed</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField margin="dense" variant="standard" id="current_balance" name="current_balance" label="Current Balance" type="number" fullWidth value={formData.current_balance} onChange={handleChange} />
                    <TextField margin="dense" variant="standard" id="target_balance" name="target_balance" label="Target Balance" type="number" fullWidth value={formData.target_balance} onChange={handleChange} />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSaveChanges} color="primary">Save Changes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
