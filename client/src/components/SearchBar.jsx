// Component for search bar for discovery page(and maybe homepage?)

import React from 'react';
import { TextField } from '@mui/material';

export function SearchBar({ searchInput, handleSearchInputChange }) {
  return (
    <div className='search-bar'>
      <TextField 
        label='Search' 
        fullWidth 
        value={searchInput} 
        onChange={handleSearchInputChange}
        style={{ width: '500px', marginBottom: '10px'}}
        
      />
    </div>
  );
} 