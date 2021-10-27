const validate = require('./validator');
const authValidatorMiddleware = require('./auth');

module.exports = {
    validate,
    authValidatorMiddleware
}