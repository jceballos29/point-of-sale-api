import { FilterQuery, QueryOptions } from 'mongoose';
import ProductModel, { Product, ProductDocument } from '../models/product.model';

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

export const create = async (product: Product) => {
  return ProductModel.create(product);
}

export const update = async (
  query: FilterQuery<ProductDocument>,
  update: Partial<ProductDocument>,
  options: QueryOptions = { lean: true, new: true },
) => {
  return await ProductModel.updateOne(query, update, options);
}

export const remove = async (
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await ProductModel.deleteOne(query, options);
}