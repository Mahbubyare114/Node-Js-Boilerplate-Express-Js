const logger = require("../config/logger");
const { userModel } = require('../models');
const { ApiError } = require("../payload/ApiError");
const status = require('http-status');
const jwt = require('jsonwebtoken');

const login = (email, password) =>{
    logger.info(`Authentication on email ${email} and password ${password}`);

    let user = userModel.getUserByEmailAndPassword(email, password);

    if(user.length <=0) {
      
        throw new ApiError(status.UNAUTHORIZED, "Email or Password Is Incorrect");
}
 
    

// Generate jwt (json web token) to the user :1-object  2- time     3-private key
  
    let token = jwt.sign({user}, process.env.JWT_SECRET_KEY , { expiresIn: '1m' });
   // console.log(token);

    return {accessToken: token};
    
}

module.exports = {
    login
}