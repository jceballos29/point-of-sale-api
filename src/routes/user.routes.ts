/** @format */

import { Router } from 'express';
import {
	addUserHandler,
	findUsersHandler,
} from '../controllers/user.controller';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';

const router = Router();

router.post(
	'/',
	[authentication, authorization(['admin'])],
	addUserHandler,
);
router.get(
	'/',
	[authentication, authorization(['admin'])],
	findUsersHandler,
);

export default router;
