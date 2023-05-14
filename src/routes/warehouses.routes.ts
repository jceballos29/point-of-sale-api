import { Router } from 'express';
import {
  handlerCreate,
  handlerDelete,
  handlerFind,
  handlerFindById,
  handlerUpdate,
} from '../controllers/warehouse.controller'
import { validator } from '../middleware';
import {
  createWarehouseSchema,
  deleteWarehouseSchema,
  getWarehouseSchema,
  updateWarehouseSchema,
} from '../schemas/warehouse.schema';

const router = Router();

router.get('/', handlerFind);
router.get('/:id', validator(getWarehouseSchema), handlerFindById);
router.post('/', validator(createWarehouseSchema), handlerCreate);
router.put('/:id', validator(updateWarehouseSchema), handlerUpdate);
router.delete('/:id', validator(deleteWarehouseSchema), handlerDelete);

export default router;