/** @format */

import jwt from 'jsonwebtoken';
import config from '../config';

export const signJWT = (payload: any) => {
	return jwt.sign(payload, config.jwtSecret as jwt.Secret, {
		expiresIn: config.jwtExpiresIn,
	});
};

export const verifyJWT = (token: string) => {
	return jwt.verify(token, config.jwtSecret as jwt.Secret);
};
