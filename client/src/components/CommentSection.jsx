import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Box, CardMedia } from '@mui/material';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import profile_ph from '../assets/profile-placeholder.jpg';

dayjs.extend(relativeTime);

export function CommentSection({ comments, user, listingID }) {
    const [data, setData] = useState({
        owner: user ? user._id : '',
        content: '',
        listingID: listingID
    });

    const createComment = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Must be logged in to comment');
            return;
        }
        try {
            const toastie = toast.loading('Posting comment...');
            const { owner, content, listingID } = data;
            const response = await axios.post('/api/comments/post', {
                owner, content, listingID
            });
            if (response.data.error) {
                toast.error('Error occurred while posting comment.', { id: toastie });
            } else {
                toast.success('Comment posted', { id: toastie });
                setData({ ...data, content: '' }); // Clear comment field after successful post
            }
        } catch (error) {
            toast.error('Error occurred while posting comment.');
            console.log(error);
        }
    };

    return (
        <>
            <Typography variant="h6" marginTop={2} style={{ fontWeight: 'bold' }}> Comments </Typography>
            <form onSubmit={createComment}>
                <Box display="flex" flexDirection="row" alignItems="center" marginBottom={2}>
                    <TextField
                        label="Insert Comment"
                        required
                        multiline
                        minRows={2}
                        maxRows={5}
                        sx={{ flex: 1, mr: 2 }}
                        value={data.content}
                        onChange={(e) => setData({ ...data, content: e.target.value })}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Post
                    </Button>
                </Box>
            </form>

            {comments.length === 0 ? (
                <Typography>No comments</Typography>
            ) : (
                comments.map(comment => (
                    <Box key={comment._id} marginTop={3} sx={{ background: "#f5f5f5", padding: 2 }}>
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <CardMedia component="img" sx={{ borderRadius: '50%', width: 30, height: 30, marginRight: 1 }} image={comment.owner.profilePicture || profile_ph} />
                            <Typography variant="subtitle1"> {comment.owner.name} · </Typography>
                            <Typography variant="body2" color="textSecondary"> {dayjs(comment.created_at).fromNow()} </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ marginTop: 1 }}>
                            {comment.content}
                        </Typography>
                    </Box>
                ))
            )}
        </>
    );
}
