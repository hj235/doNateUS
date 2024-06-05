import React from 'react';
import './CreateListing.css';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material'
import toast from 'react-hot-toast';

export default function createListing() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    listing_id: '',
    status: '',
    title: '',
    description: '',
    media: '',
    target_balance: '',
  })

  async function createListing(e) {
    e.preventDefault();
    const { listing_id, status, title, description, media, target_balance } = data;
    try {
      // data is the response provided by the server from the POST request
      const { data } = await axios.post('/create', {
        listing_id, status, title, description, media, target_balance
      });

      if (data.error) {
        // TODO: use toast for notifications
        toast.error("Error occured")
      } else {
        setData({
            listing_id: '',
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
    <div className="page-container">
      <div className="wrapper">
        <div className="form-box">
          <form method="post" onSubmit={createListing}>
            <h1>Create a Listing</h1>
            <br />
            <TextField label="Listing ID" variant="outlined" id="username" className="textfield" type="text" required
              value={data.listing_id} onChange={(e) => setData({ ...data, name: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <TextField label="Title" variant="outlined" id="username" className="textfield" type="text" required
              value={data.title} onChange={(e) => setData({ ...data, name: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <TextField label="Description" variant="outlined" id="username" className="textfield" type="text" 
              value={data.description} onChange={(e) => setData({ ...data, name: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <TextField label="Link to Image/Video" variant="outlined" id="username" className="textfield" type="text" 
              value={data.media} onChange={(e) => setData({ ...data, name: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <TextField label="Target Balance" variant="outlined" id="username" className="textfield" type="text" 
              value={data.target_balance} onChange={(e) => setData({ ...data, name: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <Button type="submit" variant="text" sx={{ color: 'darkgray', '&:hover': { color: "black", userSelect: "none" } }}> Create</Button>
          </form>
          <br />
        </div>
      </div>
    </div>
  )
}
