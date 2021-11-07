const logger = require("../config/logger");
const { userModel } = require('../models');


// ========== Bussiness Logic Starts From Here  ========== //

/**
 * check isIdExist, if true throw error else create
 */
const isIdExist = async(id) => {
    if(userModel.isIdExist(id)){
        logger.warn('This User Is Already Exists');   
        return true;         
    } 
    return false;
}  

/**
 * check isEmailExist, if true throw error else create
 */
const isEmailExist = async(email) => {
    
    if(userModel.isEmailExist(email)){
        logger.warn('Trying to Create an Existed User Email');   
        return true;         
    } 
    return false;
} 

// ========== Bussiness Logic Ends To Here  ========== //


// ========== User API Model Calls Starts Here  ========== //

/** 
 * Give Call To Create User inside The Model
 */
const createUser = async(user) => {
    let userCreated = userModel.create(user);
    return userCreated;
}

/**
 * Give Call To Update User inside the Model
 */
const updateUser = async(user) => {
    let userUpdated = userModel.update(user);
    return userUpdated;
}

/**
 * Give Call To Delete User inside the Model
 */
const deleteUser = async(user) => {
    let deletedUser = userModel.userDelete(user);
    return deletedUser;
}


/**
 * Give Call To Get All Users inside the Model
 */
const getAllUsers = async () => {
    return userModel.getAllUsers();
   
}

/**
 * Give Call To Get Single User inside the Model - Oracle
 */
const getUserById = async (id) => {
    return userModel.getUserById(id);   
}

// ========== User API Model Calls Ends Here  ========== //

module.exports = {
    isIdExist,
    isEmailExist,
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}
