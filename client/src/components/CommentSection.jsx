import React from 'react';
import { Typography } from '@mui/material';

export function CommentSection({ comments }) {
    return (
        <>
            <Typography variant="h6" marginTop={2} style={{ fontWeight: 'bold' }}>
                Comments
            </Typography>
            {comments.length === 0 ? (
                <Typography>No comments</Typography>
            ) : (
                <Typography>{comments.length} comments</Typography>
            )}
        </>
    );
}
