const morgan = require('morgan');
const logger = require("../config/logger");


const morganLogger = morgan(
    
 "tiny",
      { stream : logger.stream.write } 
);
module.exports = morganLogger;