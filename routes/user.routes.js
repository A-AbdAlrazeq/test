import express from 'express';
import { getUsers, createUser } from '../controllers/user.controller.js';
import { getLimiter, postLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.get('/', getLimiter, getUsers);
router.post('/', postLimiter, createUser);

export default router;