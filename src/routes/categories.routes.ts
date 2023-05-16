import { Router } from 'express';
import { handlerFind } from '../controllers/category.controller';

const router = Router();

router.get('/', handlerFind);

export default router;
