import express from 'express';
import { createPost, getPosts, updatePost, deletePost, addComment, deleteComment,likePost,dislikePost,addReply } from '../controllers/post.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import isAdmin from '../middlewares/admin.middleware.js';
import upload from '../middlewares/multer.middleware.js';
const router = express.Router();

router.post('/', upload.single("img"), createPost);
router.get('/', getPosts);
router.put('/:id',  updatePost);
router.delete('/:id', upload.single("img"), deletePost);


router.post('/:postId/comments',  addComment);
router.delete('/:postId/comments/:commentId', deleteComment);
router.post('/:id/like',likePost);
router.post('/:id/dislike',dislikePost);
router.post('/addreply',addReply);
router.post('/:postId/comments/:commentId/replies', addReply); 

export default router;
