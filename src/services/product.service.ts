import { FilterQuery, QueryOptions } from 'mongoose';
import ProductModel, { ProductDocument } from '../models/product.model';

export const find = async (
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await ProductModel.find(query, null, options);
}

export const findOne = async (
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await ProductModel.findOne(query, null, options);
}

export const create = async () => {}

export const update = async (
  query: FilterQuery<ProductDocument>,
  data: Partial<ProductDocument>,
  options: QueryOptions = { lean: true, new: true },
) => {
  return await ProductModel.updateOne(query, data, options);
}