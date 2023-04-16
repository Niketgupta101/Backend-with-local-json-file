import * as express from 'express';

import * as postsController from '../controller/posts.controller.js';
import { isAuthorized } from '../middleware/isAuthorized.js';

const router = express.Router();

router.get('/', isAuthorized, postsController.fetchAllPosts);
router.post('/', isAuthorized, postsController.createPost);

export default router;