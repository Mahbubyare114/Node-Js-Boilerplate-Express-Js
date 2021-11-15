const logger = require("../config/logger");
const { userModel } = require('../model');
const { ApiError } = require("../payload/ApiError");
const status = require('http-status');
const jwt = require('jsonwebtoken');


const login = async(email, password) =>{
    logger.info(`Authentication Started on email: ${email}`);
    console.log(`Executing getUserByEmailAndPassword call to model from auth service ${email}`);

    let user = await userModel.getUserByEmailAndPassword(email, password);
    console.log(`User Entered: ${user.email}`);
   // if email or pass incorrect if is not working i have to check it
    if (!user || user.length <= 0) {
        
        let message = res.__('incorrectEmailOrPassError');
        throw new ApiError(status.UNAUTHORIZED, message);
    }

   /**
   *  Generate jwt (json web token) to the Authenticated User
   *  Which Consist: 1-object  2-private key  3-time or expiration
   */
  
    let token = jwt.sign({userid: user.userid, rolename: user.rolename}, process.env.JWT_SECRET_KEY , { expiresIn: '30m'} ); 
    console.log(`userId in authentication   : ${user.userid}`);
    console.log(`userRole in authentication : ${user.rolename}`);


    return {accessToken: token};
}

/** 
 * Give Call To Register User inside The Model after checking isEmailExist
 */
const register = async (user) => {
    let err = '';

// go and check isEmailExist 
    
    let result = await userModel.create(user);
    if (!result)
        err = 'Something went wrong';

    return {result, err};
}

// ========== Bussiness Logic Starts From Here  ========== //

/**
 * check isEmailExist, if true throw error else register
 */
const isEmailExist = async(email) => {
    console.log(`Executing isEmailExist from auth service ${email}`);
    
    if(await userModel.isEmailExist(email)){
        return true;         
    } 
    return false;
} 
// ========== Bussiness Logic Ends To Here  ========== //

module.exports = {
    login,
    register,
    isEmailExist
}