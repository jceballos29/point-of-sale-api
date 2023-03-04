/** @format */

import * as dotenv from 'dotenv';

dotenv.config();

export default {
	port: Number(process.env.PORT),
	mongoUri: process.env.MONGO_URI as string,
	jwtSecret: process.env.JWT_SECRET as string,
	salt: Number(process.env.SALT),
	jwtExpiresIn: process.env.JWT_EXPIRES_IN as string,
};
