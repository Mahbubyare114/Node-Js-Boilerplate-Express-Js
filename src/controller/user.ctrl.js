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

   let users = await userService.getAllUsers();
   res.status(status.OK)
   .send(new ApiResponse(status.OK, res.__('allUsers') , users));

});
// ********** Get All Users Ends To Here ********** //

// ********** Get User by it's email Starts From Here ********** //
/**
 * get single User Controller 
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

    let getUserByEmail = await userService.getUserByEmail(user.email);
         res.status(status.OK)
        .send(new ApiResponse (status.OK , res.__('singleUser'), getUserByEmail));  
    }
    throw new ApiError(status.NOT_ACCEPTABLE, res.__('emailNotExists'));                                   
});
// ********** Get User by it's email Ends Here ********** //

// ********** Create User Starts From Here ********** //
/**
 * Create User Controller 
 */
 const create = handleAsync( async(req, res) => {
    logger.info('Calling Create User');
   
/**
 * Get The User
 */
    let user = req.body;
   // console.log(`Executing create user from controller ${user}`);
/**
 * Check If User email is Already Exist
 */
    if(await userService.isEmailExist(user.email)){    
         return res.status(status.NOT_ACCEPTABLE)
        .send(new ApiError (status.NOT_ACCEPTABLE , res.__('emailExists')));          
    }

  /**
 * If Not Exist Then Create New User
 */
    let createUserStatus = await userService.createUser(user);

    if(createUserStatus){
        return res.status(status.OK)
        .send(new ApiResponse(status.OK, res.__('userCreated')));
    }
  /**
 * Display Internal Error if Occurs
 */
    return res.status(status.INTERNAL_SERVER_ERROR)
    .send(new ApiError(status.INTERNAL_SERVER_ERROR, res.__('internalErrorMsg')));
        
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
    //console.log(`get user to update: ${user}`)

/**
 * Check If User email is Not Exist in Order to Update
 */
    if(!userService.isEmailExist(user.email)){
        logger.warn("Someone Trying To Update User That Does't Exist");

        return res.status(status.NOT_ACCEPTABLE)
       .send(new ApiError(status.NOT_ACCEPTABLE, res.__('notExist') +' : ' +user.email));          
   }
 /**
 *  Update User If It Exists
 */
   let updatedUser = await userService.updateUser(user);
   //console.log(`updating user: ${updatedUser}`)

    if(updatedUser){
        return res.status(status.OK)
        .send(new ApiResponse(status.OK, res.__('userUpdated')));
    }
 /**
 *  Display Internal Error if Error Occurs in the DB
 */  
    res.send(new ApiError(status.INTERNAL_SERVER_ERROR, res.__('internalErrorMsg')));
});
// ********** Update User Ends To Here ********** //

// ********** Delete User Starts From Here ********** //
/**
 * Delete User Controller
*/
 const delet = handleAsync(async(req, res) => {
/**
 * Get The User email
*/
    let user = req.body; 
/**
 * Check If User Already Exist's in Order to Delete
*/  
    if(!await userService.isEmailExist(user.email)){
       return res.status(status.NOT_ACCEPTABLE)
       .send(new ApiError(status.NOT_ACCEPTABLE, res.__('emailNotExists')));          
    }
    
/**
 * Delete User If It Exists
*/
   let deletedUser = await userService.deleteUser(user);    
  // console.log(`deleting user: ${deletedUser}`)
    
    if(deletedUser){
        return res.status(status.OK)
        .send(new ApiResponse(status.OK, res.__('userDeleted')));
    } 
 /**
 *  Display Internal Error if Error Occurs in the DB
 */  
      res.send(new ApiError(status.INTERNAL_SERVER_ERROR, res.__('internalErrorMsg')));
});
// ********** Delete User Ends To Here ********** //

 // ========== User API Service Calls Ends Here  ========== //


module.exports = {
    create,
    update,
    getAllUsers,
    getUserByEmail,
    delet

}