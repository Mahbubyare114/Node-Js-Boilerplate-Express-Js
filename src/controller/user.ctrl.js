const { response } = require('express');
const status = require('http-status');
const { required } = require('joi');
const { loggers } = require('winston');
const logger = require('../config/logger');
const { ApiError } = require('../payload/ApiError');
const { ApiResponse } = require('../payload/ApiResponse');
const { userServices } = require('../services');
const {handleAsync} = require('../utils/util');

// ========== User API Service Calls Starts From Here  ========== //

// ********** Create User Starts From Here ********** //
/**
 * Create User Controller 
 */
 const create = handleAsync( async(req, res) => {
    logger.info('Calling Create User');
   
  /**
 * Get The User
 */
    let user = await userServices.createUser(req.body);
    //console.log(user);
/**
 * Check If User Id is Already Exist
 */
    if(userServices.isIdExist(user.id)){
        let message = res.__('IdExist');
       
         return res.status(status.NOT_ACCEPTABLE)
        .send(new ApiError (status.NOT_ACCEPTABLE , message));          
    }

  /**
 * If Not Exist Then Create New User
 */
    let createUserStatus = await userServices.createUser(user);

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

    let user = userServices.updateUser(req.body);
    console.log(user);

/**
 * Check If User Id is Not Exist in Order to Update
 */
    if(!userServices.isIdExist(user.id)){
        logger.warn("Someone Trying To Update User That Does't Exist");

        let message = res.__('notExist');

        return res.status(status.NOT_ACCEPTABLE)
       .send(new ApiError(status.NOT_ACCEPTABLE, message +' : ' +user.id));          
   }
 /**
 *  Update User If It Exists
 */
   let updatedUser = userServices.updateUser(user.id);
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
const delet = (req, res) => {

let user = req.body;
//console.log(user);

/**
 * Check If User Already Exist's in Order to Delete
 */
if(!userServices.isIdExist(user.id)){

    let message = res.__('notExist');
   return res.status(status.NOT_ACCEPTABLE)
   .send(new ApiError(status.NOT_ACCEPTABLE, message +user.id));          
}

/**
 * Delete User If It Exists
 */
let deletedUser = userServices.deleteUser(user);
if(deletedUser){

    let deletedUserMsg = res.__('userDeleted');
    return res.status(status.OK)
    .send(new ApiResponse(status.OK, deletedUserMsg));
    } 
}
// ********** Delete User Ends To Here ********** //

// ********** Get All Users Starts From Here ********** //
/**
 * Get All Users Controller
 */
const getAllUsers = handleAsync( async (req, res) => {  

    let message = res.__('allUsers'); // i18n support for res

   let user = await userServices.getAllUsers();
   res
   .status(status.OK)
   .send(new ApiResponse(status.OK, message , user));

});
// ********** Get All Users Ends To Here ********** //

// ********** Get User by it's id Starts From Here ********** //
/**
 * get user by it's id controller
 */
  const getUserById = handleAsync(async (req, res) => {
    let message = res.__('singleUser'); // i18n support for res

    let user = await userServices.getUserById(req.params.userId)
    if(user.length){
        response = new ApiResponse(res.status, message , user) 

      //  console.log(response);
    }
    let notExistMessage = res.__('notExist');  // read msg from locales notExist
    throw new ApiError(status.NOT_ACCEPTABLE, notExistMessage)
                                       
    // res.send(response) 
});
// ********** Get User by it's id Ends To Here ********** //

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
    getUserById,
    delet,
    testCall

}