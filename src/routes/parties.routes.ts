import { Router } from 'express';
import { handlerFind } from '../controllers/party.controller'

const router = Router();

router.get('/', handlerFind);

export default router;