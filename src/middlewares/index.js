const validate = require('./validator');
const morganMiddleware = require('./morgan');
const authValidatorMiddleware = require('./auth').auth;
const authrizationMiddleware = require('./auth').authrization;


module.exports = {
    validate,
    authValidatorMiddleware,
    morganMiddleware,
    authrizationMiddleware
}