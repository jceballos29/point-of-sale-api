/** @format */

import mongoose from 'mongoose';
import log from '../libs/logger';
import config from '.';

const connectDB = async () => {
	try {
		mongoose.set('strictQuery', true);
		const conn = await mongoose.connect(config.mongoUri);
		log.info(`MongoDB Connected: ${conn.connection.name}`);
	} catch (error: any) {
		log.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
