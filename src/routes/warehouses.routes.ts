import { Router } from 'express';
import { handlerFind } from '../controllers/warehouse.controller';

const router = Router();

router.get('/', handlerFind);

export default router;
