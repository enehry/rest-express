import dayjs from 'dayjs';
import logger from 'pino';

const log = logger({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize:true,
      translateTime: 'SYS:standard',
      },
    }
  });

export default log;
