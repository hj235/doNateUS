import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Card, CardMedia, Typography, Box, CircularProgress } from '@mui/material';
import { useUserContext } from '../../hooks/useUserContext';
import { LikeButton } from '../components/LikeButton';
import { DeleteButton } from '../components/DeleteButton';
import { EditButton } from '../components/EditButton';
import { UpdateButton } from '../components/UpdateButton';
import { Updates } from '../components/Updates';
import { SimilarListings } from '../components/SimilarListings';
import { MediaList } from '../components/MediaList';
import { CommentSection } from '../components/CommentSection';
import media_ph from '../assets/listing-media-placeholder.jpg';
import profile_ph from '../assets/profile-placeholder.jpg';
import { EditMedia } from '../components/EditMedia';

function Listing() {
    dayjs.extend(relativeTime);
    const { user } = useUserContext();
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
        return <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
            <CircularProgress />
        </Box>;
    }

    const calculateDaysDifference = (day) => {
        const now = dayjs();
        const end = dayjs(day);
        return end.diff(now, 'day');
    };

    const hasGoal = listing.target_balance !== 0 && listing.target_balance !== null;
    const tracked = listing.type === "Fundraiser" || listing.type === "Recruitment";

    const isOwner = user && listing.owner._id === user._id;

    return (
        <Box marginTop={8} marginLeft={30} marginRight={30} display={'flex'} flexDirection={'column'}>
            <Card sx={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', display: 'flex' }}>
                <CardMedia component="img" height="500" image={listing.media && listing.media.length > 0 ? listing.media[0] : media_ph} sx={{ background: 'grey', objectFit: 'contain' }} alt="Listing Image" />
            </Card>

            <Box display="flex" flexDirection="row" width="100%">
                <Box flex={8} padding={1}>
                    <Typography variant={'h2'}> {listing.title} </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', marginTop: 5 }}>
                        <CardMedia component="img" sx={{ borderRadius: '50%', width: 60, height: 60, marginRight: 1 }}
                            image={listing.owner.profilePicture || profile_ph}
                        />
                        <Typography variant="h6"> {listing.owner.name} </Typography>
                    </Box>

                    <Typography variant="h6" marginTop={2} style={{ fontWeight: 'bold' }}>Description</Typography>
                    <Typography variant="body1" marginTop={2} style={{ whiteSpace: 'pre-line' }}>{listing.description}</Typography>

                    <Typography variant="h6" marginTop={2} style={{ fontWeight: 'bold' }}>Media</Typography>
                    <MediaList media={listing.media.slice(1)} />
                    <CommentSection comments={listing.comments || []} user={user} listingID={listing._id} listingOwner={listing.owner}/>
                </Box>

                <Box flex={2} padding={1} display="flex" flexDirection="column" >
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>Likes</Typography>
                    <LikeButton listing={listing} />
                    {isOwner && (
                        <Box width={180} marginTop={5}>
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Owner Actions</Typography>
                            <EditButton listing={listing} onSave={setListing} />
                            <EditMedia listing={listing} onSave={setListing} />
                            <DeleteButton listingId={id} />
                            <UpdateButton listingId={id} />
                        </Box>
                    )}
                    <Box display={'flex'} flexDirection={'column'} marginTop={5}>
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>Details</Typography>
                        <Typography variant="body1" marginTop={2}>Listed</Typography>
                        <Typography variant="body1" > {`${dayjs(listing.created_at).fromNow()}`} </Typography>
                        <Typography variant="body1" marginTop={2}>Category</Typography>
                        <Typography variant="body1">{listing.type}</Typography>
                        {tracked && (
                            <React.Fragment>
                                <Typography variant="body1" marginTop={2}>Progress</Typography>
                                <Typography variant="body1">
                                    {listing.type === 'Fundraiser' ? (
                                        hasGoal ? `$${listing.current_balance}/$${listing.target_balance} raised` :
                                            `$${listing.current_balance} raised`
                                    ) : (
                                        hasGoal ? `${listing.current_balance}/${listing.target_balance} slots taken` :
                                            `${listing.current_balance} slots taken`
                                    )}
                                </Typography>
                            </React.Fragment>
                        )}

                        <Typography variant="body1" marginTop={2}>Deadline</Typography>
                        <Typography variant="body1" > {`${dayjs(listing.deadline).fromNow()}`} </Typography>

                        <Typography variant="body1" marginTop={2}>Tags</Typography>
                        {listing.tags.map((tag, index) => (
                            <Typography key={index} variant="body1"> {tag} </Typography>))
                        }

                        <Typography variant="h6" marginTop={4} style={{ fontWeight: 'bold' }}> Latest Updates </Typography>
                        <Updates announcementIds={listing.updates} />

                        <Typography variant="h6" marginTop={20} marginBottom={5} style={{ fontWeight: 'bold' }}> Similar Listings </Typography>
                        <SimilarListings listing={listing} />
                    </Box>
                </Box>

            </Box>

        </Box>
    );
}

export default Listing;
