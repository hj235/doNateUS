import React, { useState } from 'react';
import { Dialog, Button, DialogActions, DialogTitle, DialogContent, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export function EditDialog({ open, onClose, user, listing }) {
    const [formData, setFormData] = useState({
        title: listing.title,
        description: listing.description,
        type: listing.type,
        status: listing.status,
        deadline: listing.deadline ? new Date(listing.deadline).toISOString().substr(0, 16) : '',
        current_balance: listing.current_balance,
        target_balance: listing.target_balance,
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSaveChanges = () => {
        console.log('Updated data:', formData);
        window.location.reload();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Listing</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" id="title" name="title" label="Title" fullWidth value={formData.title} onChange={handleChange} />
                <TextField margin="dense" id="description" name="description" label="Description" fullWidth multiline rows={4} value={formData.description} onChange={handleChange} />
                <TextField margin="dense" id="deadline" name="deadline" label="Deadline" type="datetime-local" fullWidth value={formData.deadline} onChange={handleChange} />

                <FormControl fullWidth margin="dense">
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select labelId="type-label" id="type" name="type" value={formData.type} onChange={handleChange}
                    >
                        <MenuItem value="Fundraiser">Fundraiser</MenuItem>
                        <MenuItem value="Recruitment">Recruitment</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="dense">
                    <InputLabel labelId="status-label" >Status</InputLabel>
                    <Select labelId="status-label" id="status" name="status" value={formData.status} onChange={handleChange}
                    >
                        <MenuItem value="Open">Open</MenuItem>
                        <MenuItem value="Closed">Closed</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>

                <TextField margin="dense" id="current_balance" name="current_balance" label="Current Balance" type="Number" fullWidth value={formData.current_balance} onChange={handleChange} />
                <TextField margin="dense" id="target_balance" name="target_balance" label="Target Balance" type="Number" fullWidth value={formData.target_balance} onChange={handleChange} />


            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={handleSaveChanges} color="primary">Save Changes</Button>
            </DialogActions>
        </Dialog>
    );
}
