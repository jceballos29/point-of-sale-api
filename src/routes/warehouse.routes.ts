/** @format */

import { Router } from 'express';
import {
	addWarehouseHandler,
	findWarehouseHandler,
	findWarehousesHandler,
} from '../controllers/warehouse.controller';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';

const router = Router();

router.post('/', [authentication, authorization(['admin'])], addWarehouseHandler);
router.get('/', findWarehousesHandler);
router.get('/detail', authentication, findWarehouseHandler);

export default router;
