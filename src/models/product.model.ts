/** @format */

import { findCategory } from '../services/category.service';
/** @format */

import CategoryModel, { CategoryDocument } from './category.model';
import { WarehouseDocument } from './warehouse.model';
import { Document, model, Schema } from 'mongoose';

export interface Product {
	name: string;
	price: {
		retail: number;
		wholesale: number;
	};
	quantity: number;
	warehouse: WarehouseDocument['_id'];
	category: CategoryDocument['_id'];
	image: string;
}

export interface ProductDocument extends Product, Document {
	createdAt: Date;
	updatedAt: Date;
}

const ProductSchema = new Schema<ProductDocument>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		price: {
			retail: {
				type: Number,
				required: true,
			},
			wholesale: {
				type: Number,
				required: true,
			},
		},
		quantity: {
			type: Number,
			required: true,
		},
		warehouse: {
			type: Schema.Types.ObjectId,
			ref: 'Warehouse',
			required: true,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		image: {
			type: String,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

ProductSchema.post('save', async function () {
	const product = this as ProductDocument;
	const category = await CategoryModel.findById(product.category);
	if (category && !category.products.includes(product._id)) {
		category.products.push(product._id);
		await category.save();
	}
});

const ProductModel = model<ProductDocument>('Product', ProductSchema);

export default ProductModel;
