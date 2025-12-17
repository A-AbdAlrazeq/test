import express from 'express';
import { getPosts, createPost, getPostById, updatePost, deletePost } from '../controllers/post.controller.js';
import { getLimiter, postLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.get('/', getLimiter, getPosts);
router.post('/', postLimiter, createPost);
router.get('/:id', getLimiter, getPostById);
router.put('/:id', postLimiter, updatePost);
router.delete('/:id', postLimiter, deletePost);

export default router;
