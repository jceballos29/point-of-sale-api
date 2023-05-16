import { Router } from 'express';
import { handlerFind } from '../controllers/device.controller';

const router = Router();

router.get('/', handlerFind);

export default router;
