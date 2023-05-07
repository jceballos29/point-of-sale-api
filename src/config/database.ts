import mongoose from 'mongoose';
import { logger } from '../utils';
import { env } from './env';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(env.mongoUri!);
		logger.info(`MongoDB Connected: ${conn.connection.name}`);
	} catch (error:  any) {
		logger.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
