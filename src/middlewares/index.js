const validate = require('./validator');
const morganLogger = require('./morgan');
const {authentication , authorization} = require('./auth');



module.exports = {
    validate,
    authentication,
    morganLogger,
    authorization
}