/** @format */

import { Router } from 'express';
import {
	addCategoryHandler,
	findCategoriesHandler,
	findCategoryHandler,
} from '../controllers/category.controller';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';

const router = Router();

router.post(
	'/',
	[authentication, authorization(['admin'])],
	addCategoryHandler,
);
router.get('/', authentication, findCategoriesHandler);
router.get('/:id', authentication, findCategoryHandler);

export default router;
