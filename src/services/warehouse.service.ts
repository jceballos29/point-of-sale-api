import { FilterQuery, QueryOptions } from 'mongoose';
import WarehouseModel, { WarehouseDocument } from '../models/warehouse.model';

export const find = async (
  query: FilterQuery<WarehouseDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await WarehouseModel.find(query, null, options);
}
