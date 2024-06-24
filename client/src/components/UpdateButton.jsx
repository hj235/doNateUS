import React, { useState } from 'react';
import { Dialog, Button, DialogActions, DialogTitle, DialogContent, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

export function UpdateButton({ listingId }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleNewUpdate = async () => {
        //TODO
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained" color="success" sx={{ maxWidth: '100%', width: '100%', marginBottom: 1 }} onClick={handleClickOpen}>
                Create Update (WIP)
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle> Update </DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" variant="standard" id="title" name="title" label="Title" fullWidth value={formData.title} onChange={handleChange} />
                    <TextField margin="dense" variant="standard" id="description" name="description" label="Description" fullWidth multiline rows={8} value={formData.description} onChange={handleChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleNewUpdate} color="primary">Send Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
