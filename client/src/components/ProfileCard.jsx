import React from 'react';
import { Card, CardContent, CardMedia, Typography, LinearProgress, CardActionArea } from '@mui/material';
import profile_ph from '../assets/profile-placeholder.jpg';
import dayjs from 'dayjs';
import { useUserContext } from '../../hooks/useUserContext';
import { EditProfile } from './EditProfile';


export function ProfileCard({ user }) {
    const currentUser = useUserContext().user;

    return (
        <Card maxwidth  sx={{ display: 'flex', textAlign: 'left'}}>
            <CardMedia component="img" image={user.profilePicture || profile_ph}  sx={{ maxWidth: '50%' }}/>
            <CardContent>
                <Typography variant="h4"> {user.name} </Typography>
                <Typography variant="h6" sx={{ color: 'gray' }}> {user.email} </Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                        Joined: {dayjs(user.created_at).format('D MMMM YYYY')}
                </Typography>
                {currentUser._id == user._id && <EditProfile />}
            </CardContent>
        </Card>
    );
}