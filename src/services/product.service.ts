/** @format */

import {
	FilterQuery,
	ProjectionFields,
	QueryOptions,
} from 'mongoose';
import productModel, {
	Product,
	ProductDocument,
} from '../models/product.model';

export const addProduct = async (product: Product) => {
	return await productModel.create(product);
};

export const findProduct = async (
	query: FilterQuery<ProductDocument>,
	projection: ProjectionFields<ProductDocument>,
	options: QueryOptions = { lean: true },
) => {
	return productModel.findOne(query, projection, options);
};

export const findProducts = async (
	query: FilterQuery<ProductDocument>,
	projection: ProjectionFields<ProductDocument>,
	options: QueryOptions = { lean: true },
) => {
	return productModel.find(query, projection, options);
};
