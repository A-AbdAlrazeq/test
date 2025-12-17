import express from 'express';
import rateLimit from 'express-rate-limit';
import { getPosts, createPost, getPostById,updatePost,deletePost } from '../controllers/post.controller.js';

const router = express.Router();

// Rate limit for GET posts: 30 requests per 15 minutes
const getPostsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // limit each IP to 30 requests per windowMs
  message: 'Too many requests, please try again later.',
  statusCode: 429,
});

router.get('/', getPostsLimiter, getPosts);
router.post('/', createPost);
router.get('/:id', getPostById);
router .put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
