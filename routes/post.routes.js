import express from 'express';
import { getPosts, createPost, getPostById } from '../controllers/post.controller.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPostById);

export default router;
