import pino from 'pino';
import dayjs from 'dayjs';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS:standard',
    }
  },
  level: 'info',
  timestamp: () => `,"time":"${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`,
  base: {
    pid: false,
  },
});

export const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  }
}