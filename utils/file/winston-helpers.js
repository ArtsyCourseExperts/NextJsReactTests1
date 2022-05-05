

//https://heynode.com/blog/2020-05/add-server-logs-your-nodejs-app-morgan-and-winston/


const winston = require('winston');
const { createLogger, format, transports } = require('winston');
//const fs = require('fs');
//const path = require('path');

//FUTURE
//require('winston-daily-rotate-file');

const env = process.env.NODE_ENV || 'development';

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  };

let levelsDesired = "debug"
if ( env.toUpperCase().startsWith("PROD") )
    {
    levelsDesired = 'warn';
    }

//Defaults using NPM levels
//{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

const logDir = 'logs';
// Create the log directory if it does not exist
/*
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
*/
const logFullFilename = "/logs/app.log";    //path.join(logDir, 'app.log');
const logExceptionsFullFilename = "/logs/exceptions.log";   //path.join(logDir, 'exceptions.log');

// creates a new Winston Logger
const logger = new winston.createLogger({
    //level: 'info',

    //level: 'debug',
    level: levelsDesired,

    //format: format.simple(),

    format: format.combine(
        //format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
      ),

    exceptionHandlers: [
        new transports.Console(),
        new transports.File({ filename: logExceptionsFullFilename})
        ],

    rejectionHandlers: [
        new transports.Console(),
        new transports.File({ filename: logExceptionsFullFilename})
        ],

    transports: [
        new winston.transports.File(
                { filename: logFullFilename //'/logs/app.log'
                , level: 'error' }
                ),
        ],
    
    exitOnError: false

    //FUTURE
    // dailyRotateFileTransport
    });


//https://bestofreactjs.com/repo/winstonjs-winston
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//

/*
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
*/

logger.info("ACE server setup logger");

module.exports = logger;