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
       
         return res.status(status.NOT_ACCEPTABLE)
        .send(new ApiError (status.NOT_ACCEPTABLE ,"User is already Exist!!"));          
    }

    // if(userServices.isEmailExist(user.email)){

    //    return res.status(status.NOT_ACCEPTABLE)
    //    .send(new ApiError (status.NOT_ACCEPTABLE ,"User Email already Exist!!"));          
    // }

    // if not exist then create it


    let createUserStatus = await userServices.createUser(user);
    if(createUserStatus){
        return res.status(status.OK)
        .send(new ApiResponse(status.OK, 'User is Created Successfully'));
        // .send({message : "User is Created Successfully"});
    }
        return res.status(status.INTERNAL_SERVER_ERROR)
        .send(new ApiError(status.INTERNAL_SERVER_ERROR, "Something Went Wrong!!"));
    }
);

// update user
const update = (req, res) => {

        let user = req.body;
        // console.log(user);

// check if user id already exist
    if(!userServices.isIdExist(user.id)){
        return res.status(status.NOT_ACCEPTABLE)
       .send(new ApiError(status.NOT_ACCEPTABLE, "This User Id Does Not Exist: " +user.id));          
   }

   let updatedUser = userServices.updateUser(user);
    if(updatedUser){
        return res.status(status.OK)
        .send(new ApiResponse(status.OK, "User Updated Successfully"));
    }
    res.send(new ApiError(status.INTERNAL_SERVER_ERROR, 'Something Went Wrong!!'));
}


// delete
const delet = (req, res) => {

let user = req.body;
//console.log(user);

// check if user already exist
if(!userServices.isIdExist(user.id)){
   return res.status(status.NOT_ACCEPTABLE)
   .send(new ApiError(status.NOT_ACCEPTABLE, "This User Id Doesn't Exist: "+user.id));          
}

// delete user
let deletedUser = userServices.deleteUser(user);
if(deletedUser){
    return res.status(status.OK)
    .send(new ApiResponse(status.OK, "User is Deleted Successfully"));
    } 
}

// get all users
const getAllUsers = handleAsync( async (req, res) => {  
   let user = await userServices.getAllUsers();
   res
   .status(status.OK)
   .send(new ApiResponse(status.OK, 'All Users Are Here!' , user));

});

// get user by it's id
 /* const getUserById = (req, res) => {
   let userId = req.params.getUserById;
  
   let users = userServices.getUserById(userId.id);
   // console.log(users);
 
   if (userId === users.id){
    res.send(users);
   }
   res.end(new ApiError(status.NOT_FOUND, 'Not Found User Id'));
  
}

*/

module.exports = {
    create,
    update,
    getAllUsers,
  //  getUserById,
    delet

}