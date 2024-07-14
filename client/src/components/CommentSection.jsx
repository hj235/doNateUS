import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Box, CardMedia } from '@mui/material';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Comment } from './Comment'

dayjs.extend(relativeTime);

export function CommentSection({ comments, user, listingID, listingOwner }) {
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
                    <Comment commentID={comment._id} user={user} listingOwner={listingOwner}/>
                ))
            )}
        </>
    );
}
