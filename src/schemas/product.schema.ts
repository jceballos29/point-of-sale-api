import { TypeOf, object, string, array, number, optional } from 'zod';

const params = {
	params: object({
		id: string({
			required_error: 'Id is required',
		}),
	}),
};

const payload = {
	body: object({
		name: string({
			required_error: 'Name is required',
		}),
		image: optional(
			string({
				required_error: 'Image is required',
			}),
		),
		code: string({
			required_error: 'Code is required',
		}),
		list_price: number({
			required_error: 'List price is required',
		}),
		quantity: number({
			required_error: 'Quantity is required',
		}),
		categories: array(
			string({
				required_error: 'Categories is required',
			}),
		),
	}),
};

export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...params,
  ...payload,
});

export const getProductSchema = object({
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type GetProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
