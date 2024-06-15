import React, { useState, useEffect } from 'react';
import { useSortedByKey } from '../../hooks/useSortedByKey';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

export function FilterSelect({ listings, setListings }) {
    const [sortOption, setSortOption] = useState('created_at');

    const { sortedByKey } = useSortedByKey();

    useEffect(() => {
        const handleSorting = () => {
            const sortedListings = sortedByKey(listings, sortOption);
            setListings(sortedListings);
        };

        handleSorting();
    }, [sortOption]);

    const handleOptionChange = (event) => {
        setSortOption(event.target.value);
    };
    // TODO: Add sorting for likes

    return (
        <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start', textAlign: 'left' }}>
            <h3>Sorts</h3>
            <RadioGroup
                aria-label="sort-options"
                name="sort-options"
                value={sortOption}
                onChange={handleOptionChange}
                column
            >
                <FormControlLabel value="created_at" control={<Radio />} label="Earliest" />
                <FormControlLabel value="created_at_desc" control={<Radio />} label="Latest" />
                <FormControlLabel value="title" control={<Radio />} label="Title (A to Z)" />
            </RadioGroup>
        </FormControl>
    );
}
