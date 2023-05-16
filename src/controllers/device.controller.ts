import { Request, Response } from 'express';
import { find } from '../services/device.service';

import { logger } from '../utils';

export const handlerFind = async (_req: Request, res: Response) => {
	try {
		const devices = await find({});
		return res.status(200).json(devices);
	} catch (error: any) {
		logger.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
