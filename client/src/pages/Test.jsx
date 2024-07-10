import React from 'react';
import { ListingCard } from '../components/ListingCard';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

export default function Test() {
    const listing = {
        comments: [],
        created_at: "2024-06-11T12:37:00.931Z",
        current_balance: 0,
        description: "Hello there!",
        media: null,
        owner: 
            {
                _id: '665c369709ee06b485463b18', 
                name: 'ktw', 
                email: 'ktw@gmail.com', 
                password: '$2b$10$Wel7MNwPOliItYoAjQwv6OTad2Rgb5vj9KB01gDllvbok8I64GfoC', 
                created_at: '2024-06-02T09:08:39.265Z',
            },
        status: "",
        target_balance: null,
        title: "A very good title",
        __v: 0,
        _id: "666844ec16e8321857a97c94"
    }
    const arr = [1,2,3];
    const arr2 = [4,5,6];
    const arr3 = arr.concat(arr2);
    const Comp = () => <>ello</>;
    return (
        <div>
            <p>{arr}</p>
            <p>{arr2}</p>
            <p>{arr3}</p>
            <Comp />
            <h1>Test page</h1>
            <ListingCard listing={listing} />
            <LinearProgress variant="determinate" value={50} />
        </div>
    )
}