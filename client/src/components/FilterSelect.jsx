// Component for filter and sort options for discovery page(and maybe homepage?)

import React, { useState } from 'react';
import { useSortedByKey } from '../../hooks/useSortedByKey';
import { MenuItem, Button, InputLabel, Select, FormControl } from '@mui/material';

export function FilterSelect({ listings, setListings }) {
    // Sorting dependencies
    const [sortOption, setSortOption] = useState('');
    const sortOptions = [
        { label: 'Created Date', value: 'created_at' },
        { label: 'Title', value: 'title' },
    ];
    const { sortedByKey } = useSortedByKey();
 
    const handleOptionChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleSorting = () => {
        setListings(sortedByKey(listings, sortOption));
        console.log(listings);
    };

    return (
        <>
            <FormControl sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginLeft: '600px', marginRight: '600px' }}>
                <InputLabel id="sort-select-label">Sort by:</InputLabel>
                <Select
                id="sort-select"
                labelId="sort-select-label"
                label="Sort by:"
                value={sortOption}
                onChange={handleOptionChange}
                variant="outlined"
                fullWidth
                >
                {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </Select>
                <Button sx={{ display: 'flex', height: 1, alignSelf: 'center' }} variant="contained" color="primary" onClick={handleSorting}>Apply</Button>
            </FormControl>
        </>
    )
}