const status = require('http-status');
const logger = require('../config/logger');
const { authServices } = require('../services')
const { ApiError } = require('../payload/ApiError');
const { ApiResponse } = require('../payload/ApiResponse');


const login = (req, res) => {

    let message = res.__('loginSuccess'); // i18n multi-lang support
    
    let email = req.body.email;
    let password = req.body.password;
    let loginResponse = authServices.login(email, password);

    res.status(status.OK).send(new ApiResponse(status.OK, message, loginResponse));
}




const register = (req, res) => {
    let message = res.__('notImplemented');
    res.status(status.NOT_IMPLEMENTED).send(new ApiResponse(status.NOT_IMPLEMENTED, message));
    
}


module.exports ={
    login,
    register
}







/* 
    exports.login = (req, res) => {
  
    res.status(status.OK)
    .send(new ApiResponse(status.OK, "You Passed the Authentication, Welcome to the System!!"));
  
}

exports.register = (req, res) => {
    res.status(status.OK)
    .send(new ApiResponse(status.OK, "Registered Successfully!!"));
}

*/
// winston logger for everything
// logger.info("Hello from winston info logger");
// logger.error("Hello from winston error logger");
// logger.warn("Hello from winston warn logger");