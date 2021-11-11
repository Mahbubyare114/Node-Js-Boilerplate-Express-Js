const logger = require("../config/logger");
const { userModel } = require('../models');
const { ApiError } = require("../payload/ApiError");
const status = require('http-status');
const jwt = require('jsonwebtoken');


const login = async(email, password) =>{
    logger.info(`Authentication on email ${email}`);

    let user = await userModel.getUserByEmailAndPassword(email, password);
   console.log(`Executing getUserByEmailAndPassword from auth service ${email}`);

    if (!user || user.length <= 0) {

        let message = res.__('incorrectEmailOrPassError');
        throw new ApiError(status.UNAUTHORIZED, message);
       
    }

   /**
   *  Generate jwt (json web token) to the Authenticated User
   *  Which Consist: 1-object  2-private key  3-time or expiration
   */
    let token = jwt.sign({user}, process.env.JWT_SECRET_KEY , { expiresIn: '5m' });

    return {accessToken: token};
}


// ========== Bussiness Logic Starts From Here  ========== //

/**
 * check isEmailExist, if true throw error else register
 */
 const isEmailExist = async(email) => {
    console.log(`Executing isEmailExist from service ${email}`);
    
    if(await userModel.isEmailExist(email)){
        return true;         
    } 
    return false;
} 
// ========== Bussiness Logic Ends To Here  ========== //

/** 
 * Give Call To Register User inside The Model if it's not exist
 */
const register = async (user) => {
    let err = '';

// go and check isEmailExist 
    
    let result = await userModel.create(user);
    if (!result)
        err = 'Something went wrong';

    return {result, err};
}

module.exports = {
    login,
    register,
    isEmailExist
}