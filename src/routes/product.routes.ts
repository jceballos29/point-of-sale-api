/** @format */

import { Router } from 'express';
import {
	addProductHandler,
	findProductHandler,
	findProductsHandler,
} from '../controllers/product.controller';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';

const router = Router();

router.post('/', [authentication, authorization(['admin'])], addProductHandler);
router.get('/', authentication, findProductsHandler);
router.get('/:id', authentication, findProductHandler);

export default router;
