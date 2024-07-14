const express = require('express');
const router = express.Router();
const { getComment, createCommentOnPost, createCommentOnComment, deleteComment } = require('../controllers/commentController');

router.get('/get/:id', getComment)
router.post('/post', createCommentOnPost)
router.post('/reply/:id', createCommentOnComment);
router.patch('/delete/:id', deleteComment)
// router.get('/comment/:id', getCommentFromComment)
// router.post('/comment/:id', createCommentOnComment)
// router.delete('/comment/:id', deleteCommentFromComment)

module.exports = router;