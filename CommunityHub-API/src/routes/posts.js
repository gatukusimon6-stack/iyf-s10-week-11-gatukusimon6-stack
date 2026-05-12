const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const commentsController = require('../controllers/commentsController');
const { protect } = require('../middleware/auth');
const { validatePost } = require('../middleware/validate');

// Public routes
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);

// Protected routes
router.post('/', protect, validatePost, postsController.createPost);
router.put('/:id', protect, postsController.updatePost);
router.delete('/:id', protect, postsController.deletePost);
router.patch('/:id/like', postsController.likePost);

// Comment routes
router.get('/:postId/comments', commentsController.getComments);
router.post('/:postId/comments', protect, commentsController.createComment);
router.delete('/:postId/comments/:commentId', protect, commentsController.deleteComment);

module.exports = router;