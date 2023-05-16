import { FilterQuery, QueryOptions } from 'mongoose';
import CategoryModel, { CategoryDocument } from '../models/category.model';

export const find = async (
  query: FilterQuery<CategoryDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await CategoryModel.find(query, {}, options);
}
