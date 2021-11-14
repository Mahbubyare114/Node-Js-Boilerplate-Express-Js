const status = require('http-status'); // import http status
const logger = require('../config/logger'); // import winston logger
const { ApiError } = require('../payload/ApiError'); // import Api Error
const { ApiResponse } = require('../payload/ApiResponse'); // import Api Response
const { userService } = require('../service'); // import User service
const {handleAsync} = require('../utils/util'); // import handleAsync from util

// ========== User API Service Calls Starts From Here  ========== //

// ********** Get All Users Starts From Here ********** //
/**
 * Get All Users Controller
 */
 const getAllUsers = handleAsync( async (req, res) => {  

    let message = res.__('allUsers'); // i18n support for res

   let users = await userService.getAllUsers();
   res
   .status(status.OK)
   .send(new ApiResponse(status.OK, message , users));

});
// ********** Get All Users Ends To Here ********** //

// ********** Get User by it's email Starts From Here ********** //
/**
 * get user by it's email controller
 */
  const getUserByEmail = handleAsync(async (req, res) => {
   
/**
 * get the user email
 */
    let user = req.body;
/**
 * Check If User Email Is Already Exist
 */
  let emailExist = await userService.isEmailExist(user.email); 
  console.log(`is email exist to get user: ${emailExist}`)

    if(emailExist){

        let message = res.__('singleUser'); // i18n support for res
        let getUserByEmail = await userService.getUserByEmail(user.email);

         res.status(status.OK)
        .send(new ApiResponse (status.OK , message, getUserByEmail));  

        
    }
    let notExistMessage = res.__('emailNotExists');  // read msg from locales notExist
    throw new ApiError(status.NOT_ACCEPTABLE, notExistMessage)
                                       
});
// ********** Get User by it's id Ends To Here ********** //

// ********** Create User Starts From Here ********** //
/**
 * Create User Controller 
 */
 const create = handleAsync( async(req, res) => {
    logger.info('Calling Create User');
   
  /**
 * Get The User
 */
// let user = await userService.createUser(req.body);

    let user = req.body;
    console.log(`Executing create user from controller ${user}`);
/**
 * Check If User email is Already Exist
 */
    if(await userService.isEmailExist(user.email)){
        let message = res.__('emailExists');
       
         return res.status(status.NOT_ACCEPTABLE)
        .send(new ApiError (status.NOT_ACCEPTABLE , message));          
    }

  /**
 * If Not Exist Then Create New User
 */
    let createUserStatus = await userService.createUser(user);

    if(createUserStatus){
        let userCreatedMsg = res.__('userCreated');

        return res.status(status.OK)
        .send(new ApiResponse(status.OK, userCreatedMsg));
    }

  /**
 * Display Internal Error if Occurs
 */
    let messageInternalError = res.__('internalErrorMsg'); // read res from locales
    return res.status(status.INTERNAL_SERVER_ERROR)
    .send(new ApiError(status.INTERNAL_SERVER_ERROR, messageInternalError));
        
});
// ********** Create User Ends To Here ********** //

// ********** Update User Starts From Here ********** //
/**
 * Update User Controller
 */
const update = handleAsync( async(req, res) => {

/**
  * Get The User
 */

    let user = req.body;
    console.log(`get user to update: ${user}`)

/**
 * Check If User email is Not Exist in Order to Update
 */
    if(!userService.isEmailExist(user.email)){
        logger.warn("Someone Trying To Update User That Does't Exist");

        let message = res.__('notExist');

        return res.status(status.NOT_ACCEPTABLE)
       .send(new ApiError(status.NOT_ACCEPTABLE, message +' : ' +user.email));          
   }
 /**
 *  Update User If It Exists
 */
   let updatedUser = await userService.updateUser(user);
   console.log(`updating user: ${updatedUser}`)

    if(updatedUser){

        let message = res.__('userUpdated');

        return res.status(status.OK)
        .send(new ApiResponse(status.OK, message));
    }
 /**
 *  Display Internal Error if Error Occurs in the DB
 */  
    let messageInternalError = res.__('internalErrorMsg'); // read res from locales
    res.send(new ApiError(status.INTERNAL_SERVER_ERROR, messageInternalError));
});
// ********** Update User Ends To Here ********** //

// ********** Delete User Starts From Here ********** //
/**
 * Delete User Controller
 */
const delet = handleAsync(async(req, res) => {
/**
  * Get The User
 */
let user = req.body;
console.log(`get user to delete: ${user}`)

/**
 * Check If User Already Exist's in Order to Delete
 */
if(!userService.isEmailExist(user.email)){

    let message = res.__('notExist');
   return res.status(status.NOT_ACCEPTABLE)
   .send(new ApiError(status.NOT_ACCEPTABLE, message +user.email));          
}

/**
 * Delete User If It Exists
 */
let deletedUser = userService.deleteUser(user);
console.log(`deleting user: ${deletedUser}`)

if(deletedUser){

    let deletedUserMsg = res.__('userDeleted');
    return res.status(status.OK)
    .send(new ApiResponse(status.OK, deletedUserMsg));
    } 
});
// ********** Delete User Ends To Here ********** //

 // ========== User API Service Calls Ends Here  ========== //


/**
 * Test Call For i18n (Multi-lang) Controller
 */
const testCall = handleAsync( async (req, res) => {  
 
    let message = res.__('amountTransfer');

     res
    .status(status.OK)
    .send(new ApiResponse(status.OK, message));
 
 });


module.exports = {
    create,
    update,
    getAllUsers,
    getUserByEmail,
    delet,
    testCall

}