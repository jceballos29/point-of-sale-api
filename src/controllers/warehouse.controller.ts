import { Request, Response } from 'express';
import {
	find,
	findOne,
	create,
	update,
	remove,
} from '../services/warehouse.service';
import {
	GetWarehouseInput,
	CreateWarehouseInput,
	UpdateWarehouseInput,
	DeleteWarehouseInput,
} from '../schemas/warehouse.schema';
import { logger } from '../utils';

export const handlerFind = async (_req: Request, res: Response) => {
	try {
		const warehouses = await find({});
		// return res.status(200).json({
		//   success: true,
		//   data: categories,
		//   message: 'Categories found successfully',
		// });
		return res.status(200).json(warehouses);
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const handlerFindById = async (
	req: Request<GetWarehouseInput['params']>,
	res: Response,
) => {
	const { id } = req.params;
	try {
		const warehouse = await findOne({ _id: id });
		if (!warehouse) {
			return res.status(404).json({
				success: false,
				message: 'Warehouse not found',
			});
		}
		return res.status(200).json({
			success: true,
			data: warehouse,
			message: 'Warehouse found successfully',
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
	req: Request<{}, {}, CreateWarehouseInput['body']>,
	res: Response,
) => {
	try {
		const warehouse = await create(req.body);
		return res.status(201).json({
			success: true,
			data: warehouse,
			message: 'Warehouse created successfully',
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
		UpdateWarehouseInput['params'],
		{},
		UpdateWarehouseInput['body']
	>,
	res: Response,
) => {
	const { id } = req.params;
	try {
		const warehouse = await update(
			{
				_id: id,
			},
			req.body,
		);
		if (!warehouse) {
			return res.status(404).json({
				success: false,
				message: 'Warehouse not found',
			});
		}
		return res.status(200).json({
			success: true,
			data: warehouse,
			message: 'Warehouse updated successfully',
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
	req: Request<DeleteWarehouseInput['params']>,
	res: Response,
) => {
	const { id } = req.params;
	try {
		const warehouse = await remove({
			_id: id,
		});
		if (!warehouse) {
			return res.status(404).json({
				success: false,
				message: 'Warehouse not found',
			});
		}
		return res.status(200).json({
			success: true,
			data: warehouse,
			message: 'Warehouse deleted successfully',
		});
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
