import React from 'react';
import './Discover.css';
import { TextField } from '@mui/material';

export default function Home() {

  document.title = "Discover";

  //TODO: Figure out how to load listings from MongoDB
  //TODO: Add filter section
  //TODO: Link search bar to results displayed

  return (
    <div className="page-container">
        <TextField label='Search' className='search-bar'> Search bar </TextField>
        
    </div>
  )
}
