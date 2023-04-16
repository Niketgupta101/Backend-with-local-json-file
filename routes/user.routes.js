import * as express from 'express';

import * as userController from '../controller/user.controller.js';

const router = express.Router();

router.get('/', userController.fetchAllUsers);
router.post('/', userController.createUser);
router.get('/:userId', userController.fetchUserById);

export default router;