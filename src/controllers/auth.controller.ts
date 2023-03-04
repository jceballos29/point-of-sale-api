/** @format */

import { Request, Response } from 'express';
import log from '../libs/logger';
import {
	getUserByUsername,
	findUser,
} from '../services/user.service';
import { signJWT } from '../utils/jwt';
import { findWarehouse } from '../services/warehouse.service';
import {
	closeSession,
	createSession,
	findSession,
} from '../services/session.service';

export const login = async (req: Request, res: Response) => {
	try {
		const { username, password, database } = req.body;

		const user = await getUserByUsername(username);

		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const isMatch = await user.comparePassword(password);

		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const warehouse = await findWarehouse({ _id: database }, {});
		if (!warehouse) {
			return res.status(404).json({ message: 'Warehouse not found' });
		}

		if (
			user.role !== 'admin' &&
			!warehouse.allowedUsers.map( user => user.toString()).includes(user._id.toString())
		) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const activeSession = await findSession(
			{
				user: user._id,
				valid: true,
			},
			{},
		);

		if (activeSession) {
			return res.status(401).json({ message: 'Already logged in' });
		}

		const session = await createSession({
			user: user._id,
			warehouse: warehouse._id,
			userAgent: req.get('user-agent') || '',
			valid: true,
		});

		const token = signJWT({
			session: session._id,
		});

		user.set('password', undefined, { strict: false });

		return res.status(200).json({
			user,
			token,
		});
	} catch (error) {
		log.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
		const { session } = res.locals;
		await closeSession(session.id);
		res.status(200).json({
			message: 'Logged out',
		});
	} catch (error) {
		log.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const session = async (req: Request, res: Response) => {
	try {
		const { session } = res.locals;
		const user = await findUser({ _id: session.user }, {});
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		user.set('password', undefined, { strict: false });
		return res.status(200).json(user);
	} catch (error) {
		log.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
