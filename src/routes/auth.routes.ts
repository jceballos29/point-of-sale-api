/** @format */

import { Router } from 'express';
import {
	login,
	logout,
	session,
} from '../controllers/auth.controller';
import authentication from '../middleware/authentication';

const router = Router();

router.post('/login', login);
router.post('/logout', authentication, logout);
router.get('/session', authentication, session);

export default router;
