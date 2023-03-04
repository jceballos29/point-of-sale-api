/** @format */

import { Router } from 'express';
import {
	addClientHandler,
	findClientsHandler,
} from '../controllers/client.controller';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';

const router = Router();

router.post('/', [authentication, authorization(['admin'])], addClientHandler);
router.get('/', authentication, findClientsHandler);

export default router;
