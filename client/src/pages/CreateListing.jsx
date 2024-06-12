import React, { useState } from 'react';
import './CreateListing.css';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import { useUserContext } from '../../hooks/useUserContext';

export default function CreateListing() {
  const { user } = useUserContext();
  const [data, setData] = useState({
    title: '',
    description: '',
    media: null,
    target_balance: '',
    owner: user ? user._id : '',
  });
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('/upload', formData);
      const uploadedFileUrl = response.data.url;
      setData({ ...data, media: uploadedFileUrl });
      setIsUploaded(true);
      toast.success('File uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload file.');
      console.error(error);
    }
  };

  const createListing = async (e) => {
    e.preventDefault();
    try {
      const { title, description, media, target_balance, owner } = data;
      const response = await axios.post('/api/listings/create', {
        title,
        description,
        media,
        target_balance,
        owner,
      });
      if (response.data.error) {
        toast.error('Error occurred while creating listing.');
      } else {
        setData({
          title: '',
          description: '',
          media: null,
          target_balance: '',
          owner: user ? user._id : '',
        });
        setIsUploaded(false);
        toast.success('Listing created successfully!');
        // TODO: Navigate to the newly created listing page
      }
    } catch (error) {
      toast.error('Error occurred while creating listing.');
      console.error(error);
    }
  };

  document.title = "Create a listing";

  return (
    <div className="page-container-box">
      <div className="wrapper">
        <div className="form-box">
          <form method="post" onSubmit={createListing}>
            <h1>Create a Listing</h1>
            <br />
            <TextField label="Title" variant="outlined" id="title" className="textfield" type="text" required
              value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <TextField label="Description" variant="outlined" id="description" className="textfield" type="text" required multiline minRows={8} maxRows={8}
              value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <TextField label="Goal ($)" variant="outlined" id="target_balance" className="textfield" type="text"
              value={data.target_balance} onChange={(e) => setData({ ...data, target_balance: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <input type="file" accept="image/*, video/*" onChange={e => setFile(e.target.files[0])} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            {isUploaded ? (
              <br />
            ) : (
              <Button type="button" onClick={handleUpload}>Upload</Button>
            )}
            <br />
            <Button type="submit" variant="text" sx={{ color: 'darkgray', '&:hover': { color: "black", userSelect: "none" } }}> Create</Button>
          </form>
          <br />
        </div>
      </div>
    </div>
  )
}
