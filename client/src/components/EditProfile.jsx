import React, { useState, useEffect } from 'react';
import { Dialog, Button, DialogActions, DialogTitle, DialogContent, Icon, Box, TextField } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { useUserContext } from '../../hooks/useUserContext';
import { useFirebaseContext } from '../../hooks/useFirebaseContext';

export function EditProfile() {
    const [open, setOpen] = useState(false);
    const { user, dispatch } = useUserContext();
    const { mediaRef } = useFirebaseContext();
    const [file, setFile] = useState(null);
    const [fileURL, setFileURL] = useState(null);
    const [formData, setFormData] = useState(user);

    useEffect(() => {
        if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setFileURL(reader.result);
        }
        reader.readAsDataURL(file);
        } else {
            setFileURL(null);
        }
    }, [file]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        try {
            let mediaURL = null;
            if (file) {
                const fileRef = ref(mediaRef, `/user/${user._id}/profilePicture`);
                await uploadBytes(fileRef, file);
                await getDownloadURL(fileRef).then(url => {
                  console.log(`File uploaded to firebase storage at: ${url}`);
                  mediaURL = url;
                });
            }

            const newUser = { ...formData, profilePicture: mediaURL };
            const response = await axios.patch(`/api/user/edit/${user._id}`, newUser);
            if (response.data.error) {
                console.log(response.data.error);
                toast.error('Error updating user.\n' + response.data.error);
            } else {
                const localUser = localStorage.getItem('user');
            
                localUser && localStorage.setItem('user', JSON.stringify(newUser));
                dispatch({ type: 'LOGIN', payload: newUser });
                toast.success('Profile has been updated!');
                handleClose();
                console.log('Updated data:', response.data);
            }
        } catch (error) {
            console.error('Error updating user:', error);
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
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Edit Profile
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <form onSubmit={handleSaveChanges}>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogContent>
                        <TextField margin="dense" variant="standard" id="name" name="name" label="Name" fullWidth required value={formData.name} onChange={handleChange} />
                        <TextField margin="dense" variant="standard" id="email" name="email" label="E-mail" type='email' fullWidth required value={formData.email} onChange={handleChange} />
                        <Box sx={{display:'flex', flexDirection:'column'}}>
                            <label htmlFor="file-input">
                                
                                <h3>Change profile picture:</h3>
                            </label>
                            <input className='fileinput' accept='image/*' type='file' onChange={(e) => setFile(e.target.files[0] )} />
                            <div className='file-preview' style={{ alignContent:'center' }}>
                            {fileURL
                                ? <img className='profilepic' src={fileURL} alt='file' style={{display:'flex', maxWidth:'100%', height:'auto'}} />
                                : <Icon color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </Icon>
                            }
                            </div>
                            <button className='clearbutton' type='button' onClick={() => setFile(null)} style={{width:'fit-content'}}>Clear file</button>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={handleClose} color="primary">Cancel</Button>
                        <Button type='submit' color="primary">Save Changes</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}