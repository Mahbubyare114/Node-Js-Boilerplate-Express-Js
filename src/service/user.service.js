const logger = require("../config/logger");
const { userModel } = require('../model');

// ========== Bussiness Logic Starts From Here  ========== //
/**
 * check isEmailExist, if true throw error else create 
 * check isEmailExist, if true get user or update or delete
 */
const isEmailExist = async(email) => {
  //  console.log(`Executing isEmailExist from service ${email}`);

    if(await userModel.isEmailExist(email)){
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
    //console.log(`Executing createUser from service ${user}`);

    let userCreated = await userModel.create(user);
    return userCreated;
}

/**
 * Give Call To Update User inside the Model
 */
const updateUser = async(user) => {
    //console.log(`Executing updateUser from service ${user}`);

    let updatedUser = await userModel.update(user);
    return updatedUser;
}

/**
 * Give Call To Delete User inside the Model
 */
const deleteUser = async(user) => {
    //console.log(`Executing deleteUser from service ${user}`);

    let deletedUser = await userModel.userDelete(user);
    return deletedUser;
}

/**
 * Give Call To Get All Users inside the Model
 */
const getAllUsers = async () => {
   //console.log(`Executing getAllUsers from service`);
    return await userModel.getAllUsers();
}

/**
 * Give Call To Get Single User inside the Model - Oracle
 */
const getUserByEmail = async (email) => {
   //console.log(`Executing getUserByEmail from service ${email}`);
    return await userModel.getUserByEmail(email);   
}

// ========== User API Model Calls Ends Here  ========== //

module.exports = {
    isEmailExist,
    createUser,
    getAllUsers,
    getUserByEmail,
    updateUser,
    deleteUser
}