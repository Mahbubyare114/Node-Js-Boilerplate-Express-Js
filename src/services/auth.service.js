const logger = require("../config/logger");
const { userModel } = require('../models');
const { ApiError } = require("../payload/ApiError");
const status = require('http-status');
const jwt = require('jsonwebtoken');


const login = async(email, password) =>{
    logger.info(`Authentication on email ${email} and password ${password}`);

    let user = await userModel.getUserByEmailAndPassword(email, password);

    if(user.length <=0) {

        let message = res.__('incorrectEmailOrPassError');
        throw new ApiError(status.UNAUTHORIZED, message);
        // res.status(status.UNAUTHORIZED)
        // .send(new ApiResponse(status.UNAUTHORIZED, message));
}

  /**
   *  Generate jwt (json web token) to the Right User
   *  Which Consist: 1-object  2-private key  3-time
   */
    let token = jwt.sign({user}, process.env.JWT_SECRET_KEY , { expiresIn: '3m' });

   // console.log(token);
    return {accessToken: token};   
}

module.exports = {
    login
}