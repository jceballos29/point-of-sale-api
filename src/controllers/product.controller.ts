/** @format */

import { Request, Response } from 'express';
import {
	addProduct,
	findProduct,
	findProducts,
} from '../services/product.service';
import log from '../libs/logger';

export const addProductHandler = async (
	req: Request,
	res: Response,
) => {
	const { name, price, quantity, warehouse, category, image } =
		req.body;
	try {
		const product = await addProduct({
			name,
			price,
			quantity,
			warehouse,
			category,
			image,
		});
		res.status(201).json(product);
	} catch (error: any) {
		log.error(`Error while adding product: ${error.message}`);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const findProductHandler = async (
	req: Request,
	res: Response,
) => {
	const { id } = req.params;
	try {
		const product = await findProduct({ _id: id }, {}, {});
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const findProductsHandler = async (
	req: Request,
	res: Response,
) => {
	try {
		const { session } = res.locals;
		const products = await findProducts({
			warehouse: session.warehouse,
		}, {}, {});
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};
