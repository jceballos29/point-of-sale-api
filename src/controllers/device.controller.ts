import { Request, Response } from 'express';
import {
	find,
	findOne,
	create,
	update,
	remove,
} from '../services/device.service';
import {
	GetDeviceInput,
	CreateDeviceInput,
	UpdateDeviceInput,
	DeleteDeviceInput,
} from '../schemas/device.schema';

import { logger } from '../utils';

export const handlerFind = async (_req: Request, res: Response) => {
	try {
		const devices = await find({});
		// return res.status(200).json({
		//   success: true,
		//   data: categories,
		//   message: 'Categories found successfully',
		// });
		return res.status(200).json(devices);
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const handlerFindById = async (
	req: Request<GetDeviceInput['params']>,
	res: Response,
) => {
	const { id } = req.params;
	try {
		const device = await findOne({ _id: id });
		if (!device) {
			return res.status(404).json({
				success: false,
				message: 'Device not found',
			});
		}
		return res.status(200).json({
			success: true,
			data: device,
			message: 'Device found successfully',
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
	req: Request<{}, any, CreateDeviceInput['body']>,
	res: Response,
) => {
	try {
		const device = await create(req.body);
		return res.status(201).json({
			success: true,
			data: device,
			message: 'Device created successfully',
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
		UpdateDeviceInput['params'],
		any,
		UpdateDeviceInput['body']
	>,
	res: Response,
) => {
	const { id } = req.params;
	try {
		const device = await update({ _id: id }, req.body);

		if (!device) {
			return res.status(404).json({
				success: false,
				message: 'Device not found',
			});
		}
		return res.status(200).json({
			success: true,
			data: device,
			message: 'Device updated successfully',
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
	req: Request<DeleteDeviceInput['params']>,
	res: Response,
) => {
	const { id } = req.params;
	try {
		const device = await remove({ _id: id });
		if (!device) {
			return res.status(404).json({
				success: false,
				message: 'Device not found',
			});
		}
		return res.status(200).json({
			success: true,
			data: device,
			message: 'Device deleted successfully',
		});
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
