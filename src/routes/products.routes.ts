import { Router } from 'express';
import {
  handlerFind,
} from '../controllers/product.controller';

const router = Router();

router.get('/', handlerFind);

export default router;