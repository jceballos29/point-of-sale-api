import { FilterQuery, QueryOptions } from 'mongoose';
import WarehouseModel, { Warehouse, WarehouseDocument } from '../models/warehouse.model';

export const find = async (
  query: FilterQuery<WarehouseDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await WarehouseModel.find(query, null, options);
}

export const findOne = async (
  query: FilterQuery<WarehouseDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await WarehouseModel.findOne(query, null, options);
}

export const create = async (warehouse: Warehouse) => {
  return WarehouseModel.create(warehouse);
}

export const update = async (
  query: FilterQuery<WarehouseDocument>,
  update: Partial<WarehouseDocument>,
  options: QueryOptions = { lean: true, new: true },
) => {
  return await WarehouseModel.updateOne(query, update, options);
}

export const remove = async (
  query: FilterQuery<WarehouseDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await WarehouseModel.findByIdAndDelete(query, options);
}