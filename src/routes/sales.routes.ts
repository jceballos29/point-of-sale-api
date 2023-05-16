import { Router } from 'express';
import {
  handlerCreateSale,
  handlerFindOneSale,
  handlerFindSales,
  handlerCancelSale,
  handlerAddItems,
  handlerDeleteItem,
  handlerUpdateItem,
  handlerCompleteSale
} from '../controllers/sale.controller'
import {
  createSaleSchema,
  getSaleSchema,
  getSalesSchema,
  updateSaleSchema,
  addItemSchema,
  deleteItemSchema,
  updateItemSchema
} from '../schemas/sale.schema'
import { validator } from '../middleware'

const router = Router();

router.post('/', validator(createSaleSchema), handlerCreateSale);
router.get('/:id', validator(getSaleSchema), handlerFindOneSale);
router.get('/', validator(getSalesSchema), handlerFindSales);
router.delete('/:id', validator(updateSaleSchema), handlerCancelSale);
router.put('/:id', validator(updateSaleSchema), handlerCompleteSale);

router.post('/:id/items', validator(addItemSchema), handlerAddItems);
router.delete('/:id/items/:itemId', validator(deleteItemSchema), handlerDeleteItem);
router.put('/:id/items/:itemId', validator(updateItemSchema), handlerUpdateItem);

export default router;