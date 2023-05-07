import { Request, Response, NextFunction } from 'express';
import {  logger } from '../utils';

export const authentication = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = res.locals.user;
		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized',
			});
		}
		next();
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
