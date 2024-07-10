import React, { useState, useEffect, useRef } from 'react';
import { Dialog, Button, DialogActions, DialogTitle, DialogContent, Box, Icon } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { useUserContext } from '../../hooks/useUserContext';
import { useFirebaseContext } from '../../hooks/useFirebaseContext';

export function EditMedia({ listing, onSave }) {
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [fileURLs, setFileURLs] = useState([]);
    const { mediaRef } = useFirebaseContext();
    const inputFile = useRef(null);

    useEffect(() => {
        if (files.length != 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = () => {
                    setFileURLs((prev) => prev.concat([{ url: reader.result, name: file.name }]));
                }
                reader.readAsDataURL(file);
            }
        // files.forEach(file => {
        //     const reader = new FileReader();
        //     reader.onload = () => {
        //         setFileURLs(fileURLs.concat([reader.result]));
        //     }
        //     reader.readAsDataURL(file);
        // });
        } else {
            setFileURLs([]);
        }
    }, [files]);

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        try {
            const mediaURLs = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileRef = ref(mediaRef, `/listing/${listing._id}/media/${file.name}`);
                await uploadBytes(fileRef, file);
                await getDownloadURL(fileRef).then(url => {
                    console.log(`File uploaded to firebase storage at: ${url}`);
                    mediaURLs.push(url);
                });
            }
            // const promises = [];
            // for (let i = 0; i < files.length; i++) {
            //     const file = files[i];
            //     const fileRef = ref(mediaRef, `/listing/${listing._id}/media/${file.name}`);
            //     // JS flattens promises?? wtf
            //     promises.push(uploadBytes(fileRef, file).then((res) => {
            //         getDownloadURL(fileRef).then(url => {
            //             console.log(`File uploaded to firebase storage at: ${url}`);
            //             mediaURLs.push(url);
            //         });
            //     }));
            // }
            // files.forEach(file => {
            //     const fileRef = ref(mediaRef, `/listing/${listing._id}/media/${file.name}`);
            //     // JS flattens promises?? wtf
            //     promises.push(uploadBytes(fileRef, file).then((res) => {
            //         getDownloadURL(fileRef).then(url => {
            //             console.log(`File uploaded to firebase storage at: ${url}`);
            //             mediaURLs.push(url);
            //         });
            //     }));
            // });

            // await Promise.all(promises);
            // promises.forEach((url) => {})
            // files.forEach(file => {
            //     const fileRef = ref(mediaRef, `/listing/${listing._id}/media/${file.name}`);
            //     await
            // })
            
            const response = await axios.patch(`/api/listings/update/${listing._id}`, { media: listing.media.concat(mediaURLs) });
            console.log('Updated data:', response.data);
            onSave(response.data);
            handleClose();
        } catch (error) {
            console.error('Error updating listing:', error);
        }
    };

    const handleClickOpen = () => {
        if (!listing.media) {
            toast.error('Please upload a banner before editing the media!');
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <>
            <Button variant="contained" color="primary" sx={{ maxWidth: '100%', width: '100%', marginBottom: 1}} onClick={handleClickOpen}>
                Edit Media
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <form onSubmit={handleSaveChanges}>    
                    <DialogTitle>Edit Media</DialogTitle>
                    <DialogContent>
                        <Box sx={{display:'flex', flexDirection:'column'}}>
                            <label htmlFor="file-input">
                                <h3>Upload Photos:</h3>
                            </label>
                            <input id="file-input" className='fileinput' accept='image/*' type='file' multiple onChange={(e) => {console.log(e.target.files); setFiles(e.target.files)}} ref={inputFile} />
                            <div className='file-preview' style={{ alignContent:'center' }}>
                            {fileURLs.length != 0
                                ? fileURLs.map(file => <img className='profilepic' src={file.url} key={file.name} alt='file' style={{display:'flex', maxWidth:'100%', height:'auto'}} />)
                                : <Icon color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </Icon>
                            }
                            </div>
                            <button className='clearbutton' type='button' onClick={() => {inputFile.current.value = ''; setFiles([])}} style={{width:'fit-content'}}>Clear file</button>
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
