/** @format */

import logger from 'pino';
import moment from 'moment';

const log = logger({
	transport: {
		target: 'pino-pretty',
		options: {
			translateTime: 'SYS:standard',
			colorize: true,
		},
	},
	level: 'info',
	base: {
		pid: false,
	},
	timestamp: () => `,"time":"${moment().format()}"`,
});

export default log;
