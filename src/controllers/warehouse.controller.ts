/** @format */

import { Request, Response } from 'express';
import {
	addWarehouse,
	findWarehouse,
	findWarehouses,
} from '../services/warehouse.service';

export const addWarehouseHandler = async (
	req: Request,
	res: Response,
) => {
	const { name, allowedUsers, terminals } = req.body;
	try {
		const warehouse = await addWarehouse({
			name,
			allowedUsers,
			terminals,
		});
		res.status(201).json(warehouse);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const findWarehouseHandler = async (
	req: Request,
	res: Response,
) => {
	const { id } = req.params;
	const { session } = res.locals;
	try {
		const warehouse = await findWarehouse(
			{ _id: session.warehouse },
			{},
		);
		res.status(200).json(warehouse);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const findWarehousesHandler = async (
	req: Request,
	res: Response,
) => {
	try {
		const warehouses = await findWarehouses(
			{},
			{
				allowedUsers: 0,
				terminals: 0,
			},
		);
		res.status(200).json(warehouses);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};
