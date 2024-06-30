import express from 'express';
import { createPost, getPosts, getPostById, updatePost, deletePost, addComment, deleteComment } from '../controllers/post.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import isAdmin from '../middlewares/admin.middleware.js';
import upload from '../middlewares/multer.middleware.js';
const router = express.Router();

router.post('/', upload.single("img"), createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id',  updatePost);
router.delete('/:id', upload.single("img"), deletePost);

// Comment routes
router.post('/:postId/comments',  addComment);
router.delete('/:postId/comments/:commentId', deleteComment);

export default router;
