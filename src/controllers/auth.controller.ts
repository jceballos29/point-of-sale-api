import { Request, Response } from 'express';
import { findOne as findUser } from '../services/user.service';
import { LoginInput } from '../schemas/auth.schema';
import { comparePassword, generateToken, logger } from '../utils';

export const login = async (
	req: Request<{}, {}, LoginInput['body']>,
	res: Response,
) => {
	try {
		const { username, password } = req.body;

		const user = await findUser({ username });
		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'Invalid credentials',
			});
		}

		const isValid = await comparePassword(password, user.password);

		if (!isValid) {
			return res.status(401).json({
				success: false,
				message: 'Invalid credentials',
			});
		}

		const token = generateToken({
			_id: user._id,
			role: user.role,
		});

		return res.status(200).json({
			token,
		});
	} catch (error: any) {
		logger.error(error);
		return;
	}
};

export const me = async (req: Request, res: Response) => {
	try {
		const { user: payload } = res.locals;

		const user = await findUser({ _id: payload._id },{
      select: '-password',
      populate: 'devices'
    });

		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}

		return res.status(200).json(user);
	} catch (error: any) {
		logger.error(error);
		return;
	}
};
