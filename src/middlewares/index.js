const validate = require('./validator');
const morganLogger = require('./morgan');
const authentication = require('./auth').auth;
const authorization = require('./auth').authrization;


module.exports = {
    validate,
    authentication,
    morganLogger,
    authorization
}