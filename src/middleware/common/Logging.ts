import * as winston from 'winston'
import settings from '../../../settings/environment/Index'

export const logger = new winston.Logger()

const env = settings.envNode

/**
 * @description save logger in mode dev
 */
if (env === 'development') {
  logger.add(winston.transports.Console, {
    type: 'verbose',
    colorize: true,
    prettyPrint: true,
    handleExceptions: true,
    humanReadableUnhandledException: true
  })
}

process.on('unhandledRejection', function (reason, p) {
  logger.warn('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason)
})
