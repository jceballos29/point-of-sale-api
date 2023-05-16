import { FilterQuery, QueryOptions } from 'mongoose';
import SaleModel, { SaleDocument } from '../models/sale.model';
import ItemModel, { ItemDocument } from './../models/item.model';

export const findSales = async (
  query: FilterQuery<SaleDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await SaleModel.find(query, null, options);
}

export const findOneSale = async (
  query: FilterQuery<SaleDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await SaleModel.findOne(query, null, options);
}

export const createSale = async (
  data: Partial<SaleDocument>,
) => {
  return await SaleModel.create(data);
}

export const updateSale = async (
  query: FilterQuery<SaleDocument>,
  data: Partial<SaleDocument>,
  options: QueryOptions = { lean: true, new: true },
) => {
  return await SaleModel.updateOne(query, data, options);
}

export const createItem = async (
  data: Partial<ItemDocument>,
) => {
  return await ItemModel.create(data);
}

export const updateItem = async (
  query: FilterQuery<ItemDocument>,
  data: Partial<ItemDocument>,
  options: QueryOptions = { lean: true, new: true },
) => {
  return await ItemModel.updateOne(query, data, options);
}

export const deleteItem = async (
  query: FilterQuery<ItemDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await ItemModel.deleteOne(query, options);
}

export const findItem = async (
  query: FilterQuery<ItemDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await ItemModel.findOne(query, null, options);
}
