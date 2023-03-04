/** @format */

import { NextFunction, Request, Response } from 'express';
import { verifyJWT } from '../utils/jwt';
import { getSession } from '../services/session.service';

const deserialize = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (token) {
			const decoded = verifyJWT(token) as unknown as {
				session: string;
				iat: number;
				exp: number;
			};
			const session = await getSession(decoded.session)
			if (session && session.valid) {
				const result = await session.populate('user')
				res.locals.session = {
					id: result._id,
					user: result.user,
					warehouse: result.warehouse,
				}				
			}
		}
	} catch (error: any) {
		res.locals.session = null;
	} finally {
		next();
	}
};

export default deserialize;
