import { FilterQuery, QueryOptions } from 'mongoose';
import CategoryModel, { Category, CategoryDocument } from '../models/category.model';

export const find = async (
  query: FilterQuery<CategoryDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await CategoryModel.find(query, {}, options);
}

export const findOne = async (
  query: FilterQuery<CategoryDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await CategoryModel.findOne(query, {}, options);
}

export const create = async (category: Category) => {
  return CategoryModel.create(category);
}

export const update = async (
  query: FilterQuery<CategoryDocument>,
  update: Partial<CategoryDocument>,
  options: QueryOptions = { lean: true, new: true },
) => {
  return await CategoryModel.updateOne(query, update, options);
}

export const remove = async (
  query: FilterQuery<CategoryDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await CategoryModel.findByIdAndDelete(query, options);
}