import React, { useState, useEffect } from 'react';
import { useSortedByKey } from '../../hooks/useSortedByKey';
import { FormControl, FormControlLabel, Radio, RadioGroup, Select, MenuItem } from '@mui/material';
import dayjs from 'dayjs';

export function FilterSelect({ listings, setListings}) {
    const [filters, setFilters] = useState({
        sortOption: 'created_at',
        typeFilter: 'All',
        deadlinepassed: 'hide'
    });

    const { sortedByKey } = useSortedByKey();

    useEffect(() => {
        const now = dayjs();
        const handleFilters = () => {
            if (filters.deadlinepassed === 'hide') {
                listings = listings.filter(listing => dayjs(listing.deadline).isAfter(now));
            }
            if (filters.typeFilter !== 'All') {
                setListings(sortedByKey(listings.filter(listing => listing.type === filters.typeFilter)), filters.sortOption);
            } else {
                setListings(sortedByKey(listings, filters.sortOption));
            }
        };

        handleFilters();
    }, [filters, listings, sortedByKey]);

    const handleSortOptionChange = (event) => {
        setFilters({ ...filters, sortOption: event.target.value });
    };
    const handleTypeFilterChange = (event) => {
        setFilters({ ...filters, typeFilter: event.target.value });
    };
    const handleDeadlineChange = (event) => {
        setFilters({ ...filters, deadlinepassed: event.target.value });
    };

    return (
        <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start', textAlign: 'left' }}>
            <h3> Sorts </h3>
            <RadioGroup value={filters.sortOption} onChange={handleSortOptionChange}>
                <FormControlLabel value="created_at" control={<Radio />} label="Earliest created" />
                <FormControlLabel value="created_at_desc" control={<Radio />} label="Latest created" />
                <FormControlLabel value="deadline_at" control={<Radio />} label="Earliest deadline" />
                <FormControlLabel value="deadline_at_desc" control={<Radio />} label="Furthest deadline" />
                <FormControlLabel value="title" control={<Radio />} label="Title (A to Z)" />
            </RadioGroup>

            <h3> Category </h3>
            <Select
                value={filters.typeFilter}
                onChange={handleTypeFilterChange}
                sx={{ width: 250, background: 'white' }}
            >
                <MenuItem value={'All'}>All</MenuItem>
                <MenuItem value={'Fundraiser'}> Fundraiser </MenuItem>
                <MenuItem value={'Recruitment'}> Recruitment </MenuItem>
                <MenuItem value={'Other'}> Other </MenuItem>
            </Select>

            <h3> Projects that ended </h3>
            <RadioGroup value={filters.deadlinepassed} onChange={handleDeadlineChange}>
                <FormControlLabel value="hide" control={<Radio />} label="Hide" />
                <FormControlLabel value="show" control={<Radio />} label="Show" />
            </RadioGroup>
        </FormControl>
    );
}
