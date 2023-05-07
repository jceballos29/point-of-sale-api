import { Router } from 'express';
import {
  handlerCreate,
  handlerDelete,
  handlerFind,
  handlerFindById,
  handlerUpdate,
} from '../controllers/group.controller';
import { validator } from '../middleware';
import {
  createGroupSchema,
  deleteGroupSchema,
  getGroupSchema,
  updateGroupSchema,
} from '../schemas/group.schema';

const router = Router();

router.get('/', handlerFind);
router.get('/:id', validator(getGroupSchema), handlerFindById);
router.post('/', validator(createGroupSchema), handlerCreate);
router.put('/:id', validator(updateGroupSchema), handlerUpdate);
router.delete('/:id', validator(deleteGroupSchema), handlerDelete);

export default router;
