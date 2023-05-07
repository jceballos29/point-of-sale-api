import { Schema, model, Document } from 'mongoose';
import { ProductDocument } from './product.model';

export interface Category {
	name: string;
  products: ProductDocument['_id'][] 
}

export interface CategoryDocument extends Category, Document {
	_id: string;
	createdAt: Date;
	updatedAt: Date;
}

const categorySchema = new Schema<CategoryDocument>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
    products: [{
      type: Schema.Types.ObjectId,
      ref: 'Product',
    }]
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

const CategoryModel = model<CategoryDocument>(
	'Category',
	categorySchema,
);

export default CategoryModel;
