import { Router } from 'express';
import {
  handleCreate,
  handleDelete,
  handleUpdate,
  handlerFind,
  handlerFindById,
} from '../controllers/user.controller';
import { validator } from '../middleware';
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from '../schemas/user.schema';

const router = Router();

router.get('/', handlerFind);
router.get('/:id', validator(getUserSchema), handlerFindById);
router.post('/', validator(createUserSchema), handleCreate);
router.put('/:id', validator(updateUserSchema), handleUpdate);
router.delete('/:id', validator(deleteUserSchema), handleDelete);

export default router;
