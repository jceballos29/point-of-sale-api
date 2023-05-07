import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { logger } from '../utils';

export const validator =
	(schema: AnyZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			next();
		} catch (error: any) {
			const errors = error.errors.map( (e:any) => e.message)
			logger.error(errors);
			return res.status(400).json({
				success: false,
				message: errors,
			});
		}
	};
