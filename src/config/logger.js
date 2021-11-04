const winston = require('winston');
const { combine, timestamp, label, printf,  prettyPrint } = winston.format;


const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

  // Creating your own Logger
  const logger = winston.createLogger({
  
    format: combine(
      winston.format.colorize(),
      label({ label: process.env.PROJECT_NAME }),
      timestamp(),
      myFormat
      // prettyPrint() displays logs as json format
    ),
    transports: [
      new winston.transports.Console(),
     // new winston.transports.File({ filename: 'logs.log' })
     new winston.transports.File({
      filename: 'src/logs/infos.log',
      // level: 'info' i need all levels as info not just info level
    }),
    new winston.transports.File({
      filename: 'src/logs/errors.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'src/logs/warns.log',
      level: 'warn'
    }),
    new winston.transports.File({
      filename: 'src/logs/http.log',
      level: 'http'
    })
    ]
  });

  module.exports= logger;