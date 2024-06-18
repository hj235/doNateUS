import React, { useState } from 'react';
import './CreateListing.css';
import axios from 'axios';
import { Button, TextField, InputLabel, Radio, RadioGroup, FormControlLabel, Checkbox, Select, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useUserContext } from '../../hooks/useUserContext';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const { user } = useUserContext();
  console.log(user)
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

  const createListing = async (e) => {
    e.preventDefault();
    try {
      const { title, description, type, deadline, media, target_balance, owner } = data;
      const response = await axios.post('/api/listings/create', {
        title,
        description,
        type,
        deadline,
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
          type: '',
          deadline: dayjs(),
          media: null,
          target_balance: '',
          owner: user ? user._id : '',
        });
        toast.success('Listing created successfully!');
        setTimeout(() => {
          navigate(`/listing/${response.data._id}`);
        }, 3000);
      }
    } catch (error) {
      toast.error('Error occurred while creating listing.');
      console.error(error);
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
                  <DatePicker className="textfield" value={data.deadline} onChange={(e) => setData({ ...data, deadline: e })} inputFormat="DD/MM/YYYY" />
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
