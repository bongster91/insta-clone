import express from 'express';
import { 
    createPost,
    getFeedPosts,
    getUserPosts,
    likePost,
} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';
const posts = express.Router({ mergeParams: true });


// READ
posts.get('/', verifyToken, getFeedPosts);
posts.get('/:userId/posts', verifyToken, getUserPosts);

// UPDATE
posts.patch('/:id/like', verifyToken, likePost);

export default posts;