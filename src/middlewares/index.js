const validate = require('./validator');
const authValidatorMiddleware = require('./auth');
const morganMiddleware = require('./morgan')

module.exports = {
    validate,
    authValidatorMiddleware,
    morganMiddleware
}