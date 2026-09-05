import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'dev' ? {
    target: 'pino-pretty',
  } : undefined
});

export default logger;