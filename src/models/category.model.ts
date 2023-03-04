/** @format */

import { Document, Schema, Types, model } from 'mongoose';
import { ProductDocument } from './product.model';
import { WarehouseDocument } from './warehouse.model';

export interface Category {
	name: string;
	warehouse: WarehouseDocument['_id'];
	products: ProductDocument['_id'][];
}

export interface CategoryDocument extends Category, Document {
	createdAt: Date;
	updatedAt: Date;
}

const CategorySchema = new Schema<CategoryDocument>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		warehouse: {
			type: Schema.Types.ObjectId,
			ref: 'Warehouse',
			required: true,
		},
		products: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Product',
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

const CategoryModel = model<CategoryDocument>(
	'Category',
	CategorySchema,
);

export default CategoryModel;
