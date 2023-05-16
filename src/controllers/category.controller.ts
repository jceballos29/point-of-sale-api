import { Request, Response } from 'express';
import { find } from '../services/category.service';

import { logger } from '../utils';

export const handlerFind = async (_req: Request, res: Response) => {
	try {
		const categories = await find({});
		return res.status(200).json(categories);
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
