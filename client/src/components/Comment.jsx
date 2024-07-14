import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button, Box, CardMedia, TextField } from '@mui/material';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import relativeTime from 'dayjs/plugin/relativeTime';
import profile_ph from '../assets/profile-placeholder.jpg';

dayjs.extend(relativeTime);

export function Comment({ commentID, user, listingOwner }) {
    const [comment, setComment] = useState(null);
    const [replyVisible, setReplyVisible] = useState(false);
    const [replyContent, setReplyContent] = useState('');

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await axios.get(`/api/comments/get/${commentID}`);
                if (response.status === 200) {
                    setComment(response.data);
                } else {
                    console.error('Response not okay:', response.status, response.data);
                }
            } catch (error) {
                console.error('Error fetching comment:', error);
            }
        };
        fetchComment();
    }, [commentID]);

    const handleReplySubmit = async () => {
        try {
            const toastie = toast.loading('Posting comment...');
            const response = await axios.post(`/api/comments/reply/${commentID}`, {
                owner: user ? user._id : '',
                content: replyContent
            });
            if (response.status === 200) {
                toast.success('Comment posted successfully!', { id: toastie });
                setReplyContent('');
                setReplyVisible(false);
                // Optionally, refresh the comment to show the new reply
                const response = await axios.get(`/api/comments/get/${commentID}`);
                if (response.status === 200) {
                    setComment(response.data);
                }
            } else {
                toast.error('Error occurred while posting comment.', { id: toastie });
            }
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
    };

    if (!comment) {
        return `Error fetching ${commentID}`;
    }

    return (
        <>
            <Box key={comment._id} marginTop={3} sx={{ background: "#f5f5f5", padding: 2, marginLeft: commentID ? 2 : 0 }}>
                <Box display="flex" flexDirection="row" alignItems="center">
                    <CardMedia component="img" sx={{ borderRadius: '50%', width: 30, height: 30, marginRight: 1 }} image={comment.owner.profilePicture || profile_ph} />
                    <Typography variant="body2">
                        {comment.owner.name} {comment.owner._id === listingOwner._id && <strong>Owner</strong>}
                    </Typography>

                    <Typography variant="body2" color="textSecondary"> ·{dayjs(comment.created_at).fromNow()} </Typography>
                </Box>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                    {comment.content}
                </Typography>
                <Button onClick={() => setReplyVisible(!replyVisible)}>Reply</Button>
                {replyVisible && (
                    <Box mt={2}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            label="Write your reply..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={handleReplySubmit} sx={{ mt: 1 }}>
                            Submit
                        </Button>
                    </Box>
                )}
                {comment.child_comments.length === 0 ? (
                    null
                ) : (
                    comment.child_comments.map(childComment => (
                        <Box key={childComment._id} sx={{ marginTop: 1, marginLeft: 3 }}>
                            <Comment commentID={childComment._id} user={user} />
                        </Box>
                    ))
                )}
            </Box>
        </>
    );
}
