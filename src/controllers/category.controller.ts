/** @format */

import { Request, Response } from 'express';
import {
	addCategory,
	findCategories,
	findCategory,
} from '../services/category.service';
import log from '../libs/logger';

export const addCategoryHandler = async (
	req: Request,
	res: Response,
) => {
	const { name, warehouse, products } = req.body;
	try {
		const category = await addCategory({ name, warehouse, products });
		res.status(201).json(category);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const findCategoryHandler = async (
	req: Request,
	res: Response,
) => {
	const { id } = req.params;
	try {
		const category = await findCategory(
			{ _id: id },
			{},
			{
				populate: [
					{
						path: 'products',
						model: 'Product',
					},
				],
			},
		);
		res.status(200).json(category);
	} catch (error: any) {
		log.error(
			`Error in findCategoryHandler: ${error.message}`,
		)
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const findCategoriesHandler = async (
	req: Request,
	res: Response,
) => {
	try {
		const { session } = res.locals;
		const categories = await findCategories({
			warehouse: session.warehouse,
		}, {}, {});
		res.status(200).json(categories);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};
