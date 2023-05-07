import mongoose, {
	Schema,
	model,
	Document,
	connection,
} from 'mongoose';
import { CategoryDocument } from './category.model';

export interface Product {
	name: string;
	image?: string;
	code: string;
	list_price: number;
	quantity: number;
	categories: CategoryDocument['_id'][];
}

export interface ProductDocument extends Product, Document {
	_id: string;
	createdAt: Date;
	updatedAt: Date;
}

const productSchema = new Schema<ProductDocument>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		image: {
			type: String,
			default: null,
		},
		code: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		list_price: {
			type: Number,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		categories: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Category',
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

productSchema.post('save', async function (doc: ProductDocument) {
	const CategoryModel = model<CategoryDocument>('Category');
	doc.categories.forEach(
		async (categoryId: CategoryDocument['_id']) => {
			const category = await CategoryModel.findById(categoryId);
			if (category?.products.indexOf(doc._id) === -1) {
				category?.products.push(doc._id);
				await category?.save();
			}
		},
	);
});

const ProductModel = model<ProductDocument>('Product', productSchema);

export default ProductModel;
