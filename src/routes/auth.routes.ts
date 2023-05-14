import { Router } from 'express';
import {
  login,
  me
} from '../controllers/auth.controller'
import { authentication, validator } from '../middleware';
import {
  loginSchema
} from '../schemas/auth.schema'

const router = Router();

router.post('/login', validator(loginSchema), login);
router.get('/me', authentication, me);

export default router;