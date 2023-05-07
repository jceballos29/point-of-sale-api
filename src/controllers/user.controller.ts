import { Request, Response } from 'express';
import {
	find,
	findOne,
	create,
	update,
	remove,
} from '../services/user.service';
import {
	GetUserInput,
	CreateUserInput,
	UpdateUserInput,
	DeleteUserInput,
} from '../schemas/user.schema';
import { logger } from '../utils';

export const handlerFind = async (_req: Request, res: Response) => {
	try {
		const users = await find(
			{},
			{
				populate: {
					path: 'groups',
					select: 'name',
				},
			},
		);
		return res.status(200).json({
			success: true,
			data: users,
			message: 'Users found successfully',
		});
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const handlerFindById = async (
	req: Request<GetUserInput['params']>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const user = await findOne(
			{
				_id: id,
			},
			{
				populate: {
					path: 'groups',
					select: 'name',
				},
			},
		);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}
		return res.status(200).json({
			success: true,
			date: user,
			message: 'User found successfully',
		});
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const handleCreate = async (
	req: Request<{}, {}, CreateUserInput['body']>,
	res: Response,
) => {
	try {
		const user = await create(req.body);
		return res.status(201).json({
			success: true,
			data: user,
			message: 'User created successfully',
		});
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const handleUpdate = async (
	req: Request<
		UpdateUserInput['params'],
		{},
		UpdateUserInput['body']
	>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const user = await update(
			{
				_id: id,
			},
			req.body,
		);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}
		return res.status(200).json({
			success: true,
			data: user,
			message: 'User updated successfully',
		});
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const handleDelete = async (
	req: Request<DeleteUserInput['params']>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const user = await remove({
			_id: id,
		});
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}
		return res.status(200).json({
			success: true,
			message: 'User deleted successfully',
		});
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
