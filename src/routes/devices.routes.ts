import { Router } from 'express';
import {
  handlerCreate,
  handlerDelete,
  handlerFind,
  handlerFindById,
  handlerUpdate,
} from '../controllers/device.controller'
import { validator } from '../middleware';
import {
  createDeviceSchema,
  deleteDeviceSchema,
  getDeviceSchema,
  updateDeviceSchema,
} from '../schemas/device.schema';

const router = Router();

router.get('/', handlerFind);
router.get('/:id', validator(getDeviceSchema), handlerFindById);
router.post('/', validator(createDeviceSchema), handlerCreate);
router.put('/:id', validator(updateDeviceSchema), handlerUpdate);
router.delete('/:id', validator(deleteDeviceSchema), handlerDelete);

export default router;
