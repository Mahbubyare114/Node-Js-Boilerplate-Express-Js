const morgan = require('morgan');
const logger = require("../config/logger");


const morganMiddleware = morgan(
    
 "tiny",
      { stream : logger.stream.write } 
);
module.exports = morganMiddleware;