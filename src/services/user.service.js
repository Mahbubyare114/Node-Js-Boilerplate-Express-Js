const logger = require("../config/logger");
const { userModel } = require('../models');

/**
 * 
 * check isIdExist or isEmailExist, if true throw error else create
 */
const isIdExist = (id) => {
    if(userModel.isIdExist(id)){
        logger.warn('This User Is Already Exists');   
        return true;         
    } 
    return false;
}  


const isEmailExist = (email) => {
    
    if(userModel.isEmailExist(email)){
        logger.warn('Trying to Create an Existed User Email');   
        return true;         
    } 
    return false;
} 

/**
 * 
 * @param {create} user 
 * @returns user
 */
const createUser = (user) => {
    logger.info('A New User Is Being Created!');

    let userCreated = userModel.create(user);
    return user;
}


const updateUser = (user) => {
    logger.info('User is being Updated');
    
    let userUpdated = userModel.update(user);
    return userUpdated;
}


const deleteUser = (user) => {
    logger.info('User is being Deleted');

    let deletedUser = userModel.userdelete(user);
    return deletedUser;
}


/**
 * 
 * @returns AllUsers from Static Db
 */
const getAllUsers = () => {
    logger.info('All Users Are Being Fetched');
    return userModel.getAllUsers();
   
}

const getUserById = (id) => {
    logger.info('User By Id is being Fetched');
    return userModel.getUserById(id);
   
}

module.exports = {
    isIdExist,
    isEmailExist,
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}
