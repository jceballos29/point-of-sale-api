/** @format */

import { Request, Response } from 'express';
import { addUser, findUsers } from '../services/user.service';
import log from '../libs/logger';

export const addUserHandler = async (req: Request, res: Response) => {
	const { name, username, password, role } = req.body;
	try {
		const user = await addUser({ name, username, password, role });
		res.status(201).json(user);
	} catch (error) {
		log.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const findUsersHandler = async (
	req: Request,
	res: Response,
) => {
	try {
		const users = await findUsers({});
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};
