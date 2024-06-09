import React from 'react';
import './CreateListing.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material'
import toast from 'react-hot-toast';
import { useUserContext } from '../../hooks/useUserContext';


export default function createListing() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  useEffect(() => {
    if (!user) {
      toast("Log in or register to an account to access this feature!");
      navigate("/login");
    }
  });
  const [data, setData] = useState({
    status: '',
    title: '',
    description: '',
    media: '',
    target_balance: '',
  });

  async function createListing(e) {
    e.preventDefault();
    const { status, title, description, media, target_balance } = data;
    try {
      // data is the response provided by the server from the POST request
      const { data } = await axios.post('/api/listings/create', {
        status, title, description, media, target_balance
      });

      if (data.error) {
        toast.error("Error occured")
      } else {
        setData({
            status: '',
            title: '',
            description: '',
            media: '',
            target_balance: ''
        });
        toast.success('Listing created');
        //TODO link to listing
      }

      // can have what error sia idk
    } catch (error) {
      console.log(error);
    }
  }

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
            <TextField label="Description" variant="outlined" id="description" className="textfield" type="text" required multiline minRows={8} maxRows ={8}
              value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <TextField label="Link to Image/Video" variant="outlined" id="media" className="textfield" type="text" 
              value={data.media} onChange={(e) => setData({ ...data, media: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <TextField label="Goal ($)" variant="outlined" id="target_balance" className="textfield" type="text" 
              value={data.target_balance} onChange={(e) => setData({ ...data, target_balance: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <Button type="submit" variant="text" sx={{ color: 'darkgray', '&:hover': { color: "black", userSelect: "none" } }}> Create</Button>
          </form>
          <br />
        </div>
      </div>
    </div>
  )
}
