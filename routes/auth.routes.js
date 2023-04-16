import * as express from 'express';

import * as authControler from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signin', authControler.signin);

export default router;