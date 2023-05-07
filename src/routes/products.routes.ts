import { Router } from 'express';
import {
  handlerCreate,
  handlerDelete,
  handlerFind,
  handlerFindById,
  handlerUpdate,
} from '../controllers/product.controller'
import { validator } from '../middleware';
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from '../schemas/product.schema';

const router = Router();

router.get('/', handlerFind);
router.get('/:id', validator(getProductSchema), handlerFindById);
router.post('/', validator(createProductSchema), handlerCreate);
router.put('/:id', validator(updateProductSchema), handlerUpdate);
router.delete('/:id', validator(deleteProductSchema), handlerDelete);

export default router;