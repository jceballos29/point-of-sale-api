/** @format */

import { NextFunction, Request, Response } from 'express';

const authorization =
	(roles: string[]) =>
	(req: Request, res: Response, next: NextFunction) => {
		const { session } = res.locals;
		if (roles.includes(session.user.role)) {
			next();
		} else {
			res.status(401).json({ message: 'Unauthorized' });
		}
	};

export default authorization;
