import React, { useState, useEffect } from 'react';
import './CreateListing.css';
import axios from 'axios';
import { Button, TextField, InputLabel, FormControlLabel, Checkbox, Select, MenuItem } from '@mui/material';
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
  const { user } = useUserContext();
  const { mediaRef } = useFirebaseContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to create a listing.');
      navigate('/login');
    }
  }, [user]);
  }, [user, navigate]);
  
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

  const createListing = async (e) => {
    e.preventDefault();
    let mediaURL = null
    try {
      if (file) {
        const fileRef = ref(mediaRef, `${data.title}+${file.name}+${dayjs()}`);
        await uploadBytes(fileRef, file);
        await getDownloadURL(fileRef).then(url => {
          console.log(`File uploaded to firebase storage at: ${url}`);
          mediaURL = url;
        });
      }
      
      const { title, description, type, deadline, target_balance, owner } = data;
      const response = await axios.post('/api/listings/create', {
        title,
        description,
        type,
        deadline,
        media: mediaURL,
        target_balance,
        owner,
      });
      if (response.data.error) {
        toast.error('Error occurred while creating listing.');
      } else {
        setData({
          title: '',
          description: '',
          type: '',
          deadline: dayjs(),
          media: null,
          target_balance: '',
          owner: user ? user._id : '',
        });
        toast.success('Listing created successfully!');
        const loading = toast.loading('Redirecting to listing page');
        setTimeout(() => {
          toast.dismiss(loading);
          navigate(`/listing/${response.data._id}`);
        }, 3000);
      }
    } catch (error) {
      toast.error('Error occurred while creating listing.');
      console.log(error);
    }
  };

  document.title = "Create a listing";

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="page-container-box">
        <div className="wrapper-create">
          <div className="form-box">
            <form method="post" onSubmit={createListing}>
              <h1>Create a Listing</h1>
              <div className="main-box">
                <div className='sub-box'>
                  <h3>Mandatory Fields</h3>
                  <InputLabel>Title</InputLabel>
                  <TextField className="textfield" type="text" required
                    value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
                  <br />
                  <InputLabel>Description</InputLabel>
                  <TextField className="textfield" type="text" required multiline minRows={5} maxRows={10}
                    value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
                  <br />
                  <InputLabel>Deadline</InputLabel>
                  <DateTimePicker className="textfield" value={data.deadline} onChange={(newValue) => setData({ ...data, deadline: newValue })} />
                  <br />
                  <InputLabel>Category</InputLabel>
                  <Select className='textfield' value={data.type} onChange={(e) => setData({ ...data, type: e.target.value })}>
                    <MenuItem value={'Fundraiser'}> Fundraiser </MenuItem>
                    <MenuItem value={'Recruitment'}> Recruitment </MenuItem>
                    <MenuItem value={'Other'}> Other </MenuItem>
                  </Select>
                </div>

                <div className='sub-box'>
                  <h3>Others</h3>
                  <InputLabel sx={{ width: 300 }} >Tags</InputLabel>
                  <FormControlLabel control={<Checkbox />} label="Orientation" />
                  <FormControlLabel control={<Checkbox />} label="Volunteer" />
                  <FormControlLabel control={<Checkbox />} label="Donation" />
                  <br />
                  {data.type === 'Fundraiser' && (
                    <>
                      <InputLabel>Goal ($)</InputLabel>
                      <TextField variant="outlined" id="target_balance" className="textfield" type="text"
                        value={data.target_balance} onChange={(e) => setData({ ...data, target_balance: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
                    </>
                  )}
                  {data.type === 'Recruitment' && (
                    <>
                      <InputLabel>Slots</InputLabel>
                      <TextField variant="outlined" id="target_balance" className="textfield" type="text"
                        value={data.target_balance} onChange={(e) => setData({ ...data, target_balance: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
                    </>
                  )}

                  <div>
                    <input type='file' onChange={(e) => setFile(e.target.files[0] )} />
                    <button type='button' onClick={() => setFile(null)}>Clear files</button>
                    <img src={file} alt='file'/>
                  </div>

                </div>
              </div>
              <Button type="submit" variant="text" sx={{ color: 'darkgray', '&:hover': { color: "black", userSelect: "none" } }}> Create</Button>
            </form>
            <br />
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}
