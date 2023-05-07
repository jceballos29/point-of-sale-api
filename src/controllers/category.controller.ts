import { Request, Response } from 'express';
import {
	find,
	findOne,
	create,
	update,
	remove,
} from '../services/category.service';
import {
	GetCategoryInput,
	CreateCategoryInput,
	UpdateCategoryInput,
	DeleteCategoryInput,
} from '../schemas/category.schema';
import { logger } from '../utils';

export const handlerFind = async (_req: Request, res: Response) => {
	try {
		const categories = await find({});
		// return res.status(200).json({
		// 	success: true,
		// 	data: categories,
		// 	message: 'Categories found successfully',
		// });
		return res.status(200).json(categories)
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const handlerFindById = async (
	req: Request<GetCategoryInput['params']>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const category = await findOne({
			_id: id,
		});
		if (!category) {
			return res.status(404).json({
				success: false,
				message: 'Category not found',
			});
		}
		return res.status(200).json({
			success: true,
			date: category,
			message: 'Category found successfully',
		});
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const handlerCreate = async (
	req: Request<{}, {}, CreateCategoryInput['body']>,
	res: Response,
) => {
	try {
		const { name } = req.body;
		const category = await create({
			name,
      products: []
		});
		return res.status(200).json({
			success: true,
			data: category,
			message: 'Category created successfully',
		});
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const handlerUpdate = async (
	req: Request<
		UpdateCategoryInput['params'],
		{},
		UpdateCategoryInput['body']
	>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const { name } = req.body;
		const category = await update(
			{
				_id: id,
			},
			{
				name,
			},
		);
		return res.status(200).json({
			success: true,
			data: category,
			message: 'Category updated successfully',
		});
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const handlerDelete = async (
	req: Request<DeleteCategoryInput['params']>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const category = await remove({
			_id: id,
		});
		return res.status(200).json({
			success: true,
			data: category,
			message: 'Category deleted successfully',
		});
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
