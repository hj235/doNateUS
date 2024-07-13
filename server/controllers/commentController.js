const Comment = require('../models/comment');
const Listing = require('../models/listing');

//createCommentOnPost, deleteCommentFromPost, getCommentFromComment, createCommentOnComment, deleteCommentFromComment

async function createCommentOnPost(req, res) {
    try {
        const { owner, content, listingID } = req.body;
        const listing = await Listing.findById(listingID);

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found.' });
        }

        const comment = await Comment.create({
            owner, content
        });

        listing.comments.push(comment._id);
        await listing.save();

        return res.json(comment);

    } catch (err) {
        return res.json(err);
    }
}