import { Router } from 'express';
import {
  handlerCreate,
  handlerDelete,
  handlerFind,
  handlerFindById,
  handlerUpdate,
} from '../controllers/category.controller'
import { validator } from '../middleware';
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from '../schemas/category.schema';

const router = Router();

router.get('/', handlerFind);
router.get('/:id', validator(getCategorySchema), handlerFindById);
router.post('/', validator(createCategorySchema), handlerCreate);
router.put('/:id', validator(updateCategorySchema), handlerUpdate);
router.delete('/:id', validator(deleteCategorySchema), handlerDelete);

export default router;