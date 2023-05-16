import { Request, Response } from 'express';
import {
	createSale,
	findOneSale,
	findSales,
	updateSale,
	createItem,
	deleteItem,
	updateItem,
	findItem,
} from '../services/sale.service';
import {
	findOne as findOneProduct,
	update as updateProduct,
} from '../services/product.service';
import {
	CreateSaleInput,
	GetSaleInput,
	GetSalesInput,
	UpdateSaleInput,
	AddItemInput,
	DeleteItemInput,
	UpdateItemInput,
} from '../schemas/sale.schema';

import { logger } from '../utils';

export const handlerCreateSale = async (
	req: Request<{}, {}, CreateSaleInput['body']>,
	res: Response,
) => {
	try {
		const { user } = res.locals;
		const { device, party } = req.body;
		const sale = await createSale({
			user: user._id,
			device,
			party,
		});

		return res.status(200).json(sale);
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const handlerFindOneSale = async (
	req: Request<GetSaleInput['params']>,
	res: Response,
) => {
	try {
		const { user } = res.locals;
		const { id } = req.params;
		let sale;

		if (user.role === 'admin') {
			sale = await findOneSale(
				{
					_id: id,
					status: 'pending',
				},
				{
					populate: ['user', 'items'],
				},
			);
		} else {
			sale = await findOneSale(
				{
					_id: id,
					user: user._id,
					status: 'pending',
				},
				{
					populate: ['items'],
				},
			);
		}

		if (!sale) {
			return res.status(404).json({
				success: false,
				message: 'Sale not found',
			});
		}

		return res.status(200).json(sale);
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const handlerFindSales = async (
	req: Request<{}, GetSalesInput['query'], {}>,
	res: Response,
) => {
	try {
		const { user } = res.locals;
		const { device } = req.query;
		let sales = [];
		if (user.role === 'admin') {
			sales = await findSales(
				{
					device,
					status: 'pending',
				},
				{
					sort: '-createdAt',
					populate: ['user', 'items'],
				},
			);
		} else {
			sales = await findSales(
				{
					user: user._id,
					device,
					status: 'pending',
				},
				{
					sort: '-createdAt',
					populate: ['user', 'items'],
				},
			);
		}
		return res.status(200).json(sales);
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const handlerCancelSale = async (
	req: Request<UpdateSaleInput['params']>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const sale = await updateSale(
			{
				_id: id,
			},
			{
				status: 'cancelled',
			},
		);

		if (!sale) {
			return res.status(404).json({
				success: false,
				message: 'Sale not found',
			});
		}

		return res.status(200).json(sale);
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const handlerCompleteSale = async (
	req: Request<UpdateSaleInput['params'], {}, UpdateSaleInput['body']>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const { paymentMethod } = req.body;
		const sale = await updateSale(
			{
				_id: id,
			},
			{
				status: 'completed',
				paymentMethod,
			},
		);

		if (!sale) {
			return res.status(404).json({
				success: false,
				message: 'Sale not found',
			});
		}

		return res.status(200).json(sale);
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const handlerAddItems = async (
	req: Request<AddItemInput['params'], {}, AddItemInput['body']>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const { product, quantity, price, discount } = req.body;
		const sale = await findOneSale({
			_id: id,
		});

		if (!sale) {
			return res.status(404).json({
				success: false,
				message: 'Sale not found',
			});
		}

		const item = await createItem({
			product,
			quantity,
			price,
			discount,
		});

		sale.items.push(item._id);
		sale.total =
			sale.total + (item.price * item.quantity - item.discount);

		await updateSale(
			{
				_id: id,
			},
			{
				items: sale.items,
				total: sale.total,
			},
		);

		return res.status(201).json(item);
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const handlerDeleteItem = async (
	req: Request<DeleteItemInput['params']>,
	res: Response,
) => {
	try {
		const { id, itemId } = req.params;
		const sale = await findOneSale({
			_id: id,
		});

		if (!sale) {
			return res.status(404).json({
				success: false,
				message: 'Sale not found',
			});
		}

		const item = await findItem({
			_id: itemId,
		});

		if (!item) {
			return res.status(404).json({
				success: false,
				message: 'Item not found',
			});
		}

		await deleteItem({
			_id: item._id,
		});

		sale.items = sale.items.filter((i) => i !== item._id.toString());
		sale.total =
			sale.total - (item.price * item.quantity - item.discount);

		await updateSale(
			{
				_id: id,
			},
			{
				items: sale.items,
				total: sale.total,
			},
		);

		return res.status(200).json(item);
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const handlerUpdateItem = async (
	req: Request<
		UpdateItemInput['params'],
		{},
		UpdateItemInput['body']
	>,
	res: Response,
) => {
	try {
		const { id, itemId } = req.params;
		const { product, quantity, price, discount } = req.body;
		const sale = await findOneSale({
			_id: id,
		});

		if (!sale) {
			return res.status(404).json({
				success: false,
				message: 'Sale not found',
			});
		}

		const item = await findItem({
			_id: itemId,
		});

		if (!item) {
			return res.status(404).json({
				success: false,
				message: 'Item not found',
			});
		}

		sale.total =
			sale.total -
			(item.price * item.quantity - item.discount) +
			(price * quantity - discount);

		const itemUpdated = await updateItem(
			{
				_id: item._id,
			},
			{
				product,
				quantity,
				price,
				discount,
			},
		);

		await updateSale(
			{
				_id: id,
			},
			{
				total: sale.total,
			},
		);

		return res.status(200).json(itemUpdated);
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
