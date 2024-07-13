const express = require('express');
const router = express.Router();
const { createCommentOnPost, deleteCommentFromPost, getCommentFromComment, createCommentOnComment, deleteCommentFromComment } = require('../controllers/commentController');

router.post('/post', createCommentOnPost)
// router.delete('/comment/:id', deleteCommentFromPost)
// router.get('/comment/:id', getCommentFromComment)
// router.post('/comment/:id', createCommentOnComment)
// router.delete('/comment/:id', deleteCommentFromComment)

module.exports = router;