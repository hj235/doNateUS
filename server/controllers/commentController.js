const Comment = require('../models/comment');
const Listing = require('../models/listing');

//createCommentOnPost, deleteCommentFromPost, getCommentFromComment, createCommentOnComment, deleteCommentFromComment

async function getComment(req, res) {
    try {
        const { id: commentID } = req.params;
        const comment = await Comment.findById(commentID)
            .populate('owner')
            .populate('child_comments');
        
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found.' });
        }
        
        return res.json(comment);
    } catch (err) {
        console.error('Error fetching comment:', err);
        return res.status(500).json({ error: 'An error occurred while fetching the comment.' });
    }
}

async function createCommentOnPost(req, res) {
    try {
        const { owner, content, listingID } = req.body;
        const listing = await Listing.findById(listingID);
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found.' });
        }
        const comment = await Comment.create({ owner, content });
        listing.comments.push(comment._id);
        await listing.save();
        return res.json(comment);
    } catch (err) {
        return res.json(err);
    }
}

async function createCommentOnComment(req, res) {
    try {
        const { commentID } = req.params;
        const { owner, content } = req.body;
        const parent_comment = await Comment.findById(commentID);
        if (!parent_comment) {
            return res.status(404).json({ error: 'Parent Comment not found.' });
        }
        const child_comment = await Comment.create({ owner, content });
        parent_comment.child_comments.push(child_comment._id);
        await parent_comment.save();
        return res.json(child_comment);
    } catch (err) {
        console.error('Error creating comment on comment:', err);
        return res.status(500).json({ error: 'An error occurred while creating the comment.' });
    }
}

async function deleteComment(req, res) {
    const { id } = req.params;
    try {
        const updatedComment = await Comment.findByIdAndUpdate(id, {
            owner: '669382099cccabd053367ac5',
            content: 'deleted'
        }, { new: true });

        if (!updatedComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        return res.json({ message: 'Comment updated to "deleted" successfully', comment: updatedComment });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the comment' });
    }
}




module.exports = {
    getComment,
    createCommentOnPost,
    createCommentOnComment,
    deleteComment
};