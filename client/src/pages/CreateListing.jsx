import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Checkbox, FormControlLabel, Paper, CardMedia } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useUserContext } from '../../hooks/useUserContext';
import { useFirebaseContext } from '../../hooks/useFirebaseContext';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const { user, userLoaded } = useUserContext();
  const { mediaRef } = useFirebaseContext();
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: '',
    description: '',
    media: null,
    type: '',
    deadline: dayjs(),
    target_balance: '',
    owner: user ? user._id : ''
  });

  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);

  useEffect(() => {
    if (userLoaded && !user) {
      toast.error('Please sign in to create a listing.');
      navigate('/login');
    }
  }, [user]);

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

  const createListing = async (e) => {
    e.preventDefault();
    try {
      const toastie = toast.loading('Creating listing...');
      const { title, description, type, deadline, target_balance, owner } = data;
      const response = await axios.post('/api/listings/create', {
        title,
        description,
        type,
        deadline,
        target_balance,
        owner,
      });
      if (response.data.error) {
        toast.error('Error occurred while creating listing.', { id: toastie });
      }

      let mediaURL = null
      if (file) {
        const fileRef = ref(mediaRef, `/listing/${response.data._id}/banner`);
        await uploadBytes(fileRef, file);
        await getDownloadURL(fileRef).then(url => {
          console.log(`File uploaded to firebase storage at: ${url}`);
          mediaURL = url;
        });
        const fbResponse = await axios.patch(`/api/listings/update/${response.data._id}`, { media: mediaURL });
        if (fbResponse.data.error) {
          toast.error('Error occurred while uploading banner. Please try again later.');
        } else {
          console.log('Retrieved new listing successfully');
        }
      }

      setData({
        title: '',
        description: '',
        type: '',
        deadline: dayjs(),
        media: null,
        target_balance: '',
        owner: user ? user._id : '',
      });
      toast.success('Listing created successfully!', { id: toastie });
      const loading = toast.loading('Redirecting to listing page');
      setTimeout(() => {
        toast.dismiss(loading);
        navigate(`/listing/${response.data._id}`);
      }, 3000);

    } catch (error) {
      toast.error('Error occurred while creating listing.');
      console.log(error);
    }
  };

  document.title = "Create a listing";

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md">
        <Box component={Paper} p={4} mt={4} mb={4} boxShadow={3}>
          <Typography variant="h4" gutterBottom>
            Create a Listing
          </Typography>
          <form onSubmit={createListing}>
            <Box mb={3}>
              <TextField label="Title" fullWidth required
                value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
            </Box>
            <Box mb={3}>
              <TextField label="Description" fullWidth required multiline minRows={5} maxRows={10}
                value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
            </Box>
            <Box mb={3}>
              <DateTimePicker label="Deadline" value={data.deadline}
                onChange={(newValue) => setData({ ...data, deadline: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />} />
            </Box>
            <Box mb={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={data.type}
                  onChange={(e) => setData({ ...data, type: e.target.value })}
                >
                  <MenuItem value={'Fundraiser'}>Fundraiser</MenuItem>
                  <MenuItem value={'Recruitment'}>Recruitment</MenuItem>
                  <MenuItem value={'Other'}>Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {data.type === 'Fundraiser' && (
              <Box mb={3}>
                <TextField label="Goal ($)" fullWidth
                  value={data.target_balance} onChange={(e) => setData({ ...data, target_balance: e.target.value })} />
              </Box>
            )}
            {data.type === 'Recruitment' && (
              <Box mb={3}>
                <TextField label="Slots" fullWidth
                  value={data.target_balance} onChange={(e) => setData({ ...data, target_balance: e.target.value })} />
              </Box>
            )}
            {/* <Box mb={3}>
              <Typography variant="subtitle1" gutterBottom>
                Tags
              </Typography>
              <FormControlLabel control={<Checkbox />} label="Orientation" />
              <FormControlLabel control={<Checkbox />} label="Volunteer" />
              <FormControlLabel control={<Checkbox />} label="Donation" />
            </Box> */}
            <Box mb={3}>
              <label htmlFor='fileinput'>Upload a banner</label>
              <input id='fileinput' type='file' key={file ? file.name : ''} onChange={(e) => setFile(e.target.files[0])} />
              { fileURL && (
                <CardMedia component="img" image={fileURL} alt='uploaded-file'/>
              )}
              <button className='clearbutton' type='button' onClick={() => setFile(null)}>Clear file</button>
            </Box>
            <Box textAlign="center">
              <Button type="submit" variant="contained" color="primary"> Create </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}
