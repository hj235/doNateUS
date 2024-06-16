import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';

function Listing() {
    const { id } = useParams();
    const [listing, setListing] = useState(null);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await axios.get(`/api/listings/${id}`);
                setListing(response.data);
            } catch (error) {
                console.error('Error fetching listing:', error);
            }
        };

        fetchListing();
    }, [id]);

    if (!listing) {
        return <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>; // or a loading spinner
    }

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: '20px' }}>
            <h1 style={{ marginBottom: '10px' }}>{listing.title}</h1>
            <p style={{ marginBottom: '20px' }}>{listing.description}</p>

            <div style={{ marginBottom: '20px' }}>
                <strong>Created At:</strong> {new Date(listing.created_at).toLocaleDateString()}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <strong>Owner:</strong> {listing.owner.name}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <strong>Status:</strong> {listing.status}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <strong>Type:</strong> {listing.type}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <strong>Deadline:</strong> {listing.deadline}
            </div>
        </Box>
    );
}

export default Listing;
