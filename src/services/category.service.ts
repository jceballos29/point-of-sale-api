/** @format */

import {
	FilterQuery,
	ProjectionFields,
	QueryOptions,
} from 'mongoose';
import categoryModel, {
	Category,
	CategoryDocument,
} from '../models/category.model';

export const addCategory = async (category: Category) => {
	return await categoryModel.create(category);
};

export const findCategory = async (
	query: FilterQuery<CategoryDocument>,
	projection: ProjectionFields<CategoryDocument>,
	options: QueryOptions = { lean: true },
) => {
	return categoryModel.findOne(query, projection, options);
};

export const findCategories = async (
	query: FilterQuery<CategoryDocument>,
	projection: ProjectionFields<CategoryDocument>,
	options: QueryOptions = { lean: true },
) => {
	return categoryModel.find(query, projection, options);
};
