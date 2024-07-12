import React, { useState, useEffect } from 'react';
import { useSortedByKey } from '../../hooks/useSortedByKey';
import { FormControl, FormControlLabel, Radio, RadioGroup, Select, MenuItem, Typography } from '@mui/material';
import { useUserContext } from '../../hooks/useUserContext';
import dayjs from 'dayjs';

export function FilterSelect({ searchedListings, setFilteredListings}) {
    const { user } = useUserContext();
    const [filters, setFilters] = useState({
        sortOption: 'created_at_desc',
        typeFilter: 'All',
        deadlinepassed: 'hide',
        misc: 'All',
    });

    const [deadlineListings, setDeadLineListings] = useState(searchedListings);
    const [miscListings, setMiscListings] = useState(deadlineListings)
    const [typeListings, setTypeListings] = useState(miscListings);
    

    const { sortedByKey } = useSortedByKey();

    useEffect(() => {
        if (filters.deadlinepassed === 'hide') {
            setDeadLineListings(searchedListings.filter(listing => dayjs(listing.deadline).isAfter(dayjs())));
        } else {
            setDeadLineListings(searchedListings);
        }
    }, [searchedListings, filters]);

    useEffect(() => {
        if (filters.typeFilter !== 'All') {
            setTypeListings(deadlineListings.filter(listing => listing.type === filters.typeFilter));
        } else {
            setTypeListings(deadlineListings, filters.sortOption);
        }
    }, [deadlineListings, filters]);

    useEffect(() => {
        if (filters.misc === "User") {
            setMiscListings(typeListings.filter(listing => listing.owner._id === user._id));
        } else if (filters.misc === "Liked") {
            setMiscListings(typeListings.filter(listing => user.liked_listings.includes(listing._id)));
        } else {
            setMiscListings(typeListings, filters.sortOption)
        }
    }, [typeListings, filters, user]);

    useEffect(() => {
        setFilteredListings(sortedByKey(miscListings, filters.sortOption));
    }, [miscListings, filters]);

    const handleSortOptionChange = (event) => {
        setFilters({ ...filters, sortOption: event.target.value });
    };
    const handleTypeFilterChange = (event) => {
        setFilters({ ...filters, typeFilter: event.target.value });
    };
    const handleDeadlineChange = (event) => {
        setFilters({ ...filters, deadlinepassed: event.target.value });
    };
    const handleMisc = (event) => {
        setFilters({ ...filters, misc: event.target.value});
    };

    return (
        <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start', textAlign: 'left' }}>
            <Typography variant="h6">Category </Typography>
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
            
            <Typography variant="h6"> Sorts </Typography>
            <RadioGroup value={filters.sortOption} onChange={handleSortOptionChange}>
                <FormControlLabel value="created_at" control={<Radio />} label="Earliest created" />
                <FormControlLabel value="created_at_desc" control={<Radio />} label="Latest created" />
                <FormControlLabel value="deadline_at" control={<Radio />} label="Ending Soon" />
                {/* <FormControlLabel value="deadline_at_desc" control={<Radio />} label="Furthest deadline" /> */}
                <FormControlLabel value="title" control={<Radio />} label="Title (A to Z)" />
            </RadioGroup>
            
            <Typography variant="h6"> Projects that ended </Typography>
            <RadioGroup value={filters.deadlinepassed} onChange={handleDeadlineChange}>
                <FormControlLabel value="hide" control={<Radio />} label="Hide" />
                <FormControlLabel value="show" control={<Radio />} label="Show" />
            </RadioGroup>
            { user && (
                <>
                <Typography variant="h6"> Show </Typography>
                <Select
                    value={filters.miscFilter}
                    onChange={handleMisc}
                    sx={{ width: 250, background: 'white' }}
                >
                    <MenuItem value={'Allr'}> All </MenuItem>
                    <MenuItem value={'User'}> My Listings </MenuItem>
                    <MenuItem value={'Liked'}> Liked Listings </MenuItem>
                </Select>
                </>
            )
            }
            


        </FormControl>
    );
}
