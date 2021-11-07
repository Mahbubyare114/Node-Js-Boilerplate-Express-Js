const status = require('http-status');
const { required } = require('joi');
const { loggers } = require('winston');
const logger = require('../config/logger');
const { ApiError } = require('../payload/ApiError');
const { ApiResponse } = require('../payload/ApiResponse');
const { userServices } = require('../services');
const {handleAsync} = require('../utils/util');

// create a new user
const create = handleAsync( async(req, res) => {
    
    logger.info('Calling Create User');
   
    // get the user
    let user = req.body;

    // check if user already exist
    if(userServices.isIdExist(user.id)){
        let message = res.__('IdExist');
       
         return res.status(status.NOT_ACCEPTABLE)
        .send(new ApiError (status.NOT_ACCEPTABLE , message));          
    }

    // if(userServices.isEmailExist(user.email)){

    //    return res.status(status.NOT_ACCEPTABLE)
    //    .send(new ApiError (status.NOT_ACCEPTABLE ,"User Email already Exist!!"));          
    // }

  

  // if not exist then create it
    let createUserStatus = await userServices.createUser(user);
    if(createUserStatus){
        let userCreatedMsg = res.__('userCreated');

        return res.status(status.OK)
        .send(new ApiResponse(status.OK, userCreatedMsg));
        // .send({message : "User is Created Successfully"});
    }

    let messageInternalError = res.__('internalErrorMsg'); // read res from locales
    return res.status(status.INTERNAL_SERVER_ERROR)
    .send(new ApiError(status.INTERNAL_SERVER_ERROR, messageInternalError));
        
    }
);

// update user
const update = (req, res) => {

        let user = req.body;
        // console.log(user);

// check if user id is not exist
    if(!userServices.isIdExist(user.id)){
        logger.warn("Trying To Update User That Does't Exist");
        let message = res.__('notExist');

        return res.status(status.NOT_ACCEPTABLE)
       .send(new ApiError(status.NOT_ACCEPTABLE, message +' : ' +user.id));          
   }
 
   let updatedUser = userServices.updateUser(user);
    if(updatedUser){

        let message = res.__('userUpdated');

        return res.status(status.OK)
        .send(new ApiResponse(status.OK, message));
    }
    
    let messageInternalError = res.__('internalErrorMsg'); // read res from locales
    res.send(new ApiError(status.INTERNAL_SERVER_ERROR, messageInternalError));
}


// delete
const delet = (req, res) => {

let user = req.body;
//console.log(user);

// check if user already exist
if(!userServices.isIdExist(user.id)){

    let message = res.__('notExist');
   return res.status(status.NOT_ACCEPTABLE)
   .send(new ApiError(status.NOT_ACCEPTABLE, message +user.id));          
}

// delete user
let deletedUser = userServices.deleteUser(user);
if(deletedUser){

    let deletedUserMsg = res.__('userDeleted');
    return res.status(status.OK)
    .send(new ApiResponse(status.OK, deletedUserMsg));
    } 
}

// get all users
const getAllUsers = handleAsync( async (req, res) => {  

    let message = res.__('allUsers'); // i18n support for res

   let user = await userServices.getAllUsers();
   res
   .status(status.OK)
   .send(new ApiResponse(status.OK, message , user));

});

// test call for i18n multi-lang
const testCall = handleAsync( async (req, res) => {  
 
    let message = res.__('amountTransfer');

     res
    .status(status.OK)
    .send(new ApiResponse(status.OK, message));
 
 });

// get user by it's id
  const getUserById = handleAsync(async (req, res) => {
    let message = res.__('singleUser'); // i18n support for res

    let user = await userServices.getUserById(req.params.userId)
    if(user.length){
        response = new ApiResponse(res.status, message , user) 

        console.log(user);
    }
    let notExistMessage = res.__('notExist');  // read msg from locales notExist
    throw new ApiError(status.NOT_ACCEPTABLE, notExistMessage)
                                       
    // res.send(response) 
});
    
//   let userId = req.params.getUserById();
  
//    let users = userServices.getUserById(userId.id);
//    // console.log(users);
 
//    if (userId === users.id){
//     res.send(users);
//    }
//    let notFoundErrorMsg = res.__('notExist');
//    res.end(new ApiError(status.NOT_FOUND, notFoundErrorMsg));
  
// }



module.exports = {
    create,
    update,
    getAllUsers,
    getUserById,
    delet,
    testCall

}