const { ApiError } = require("../payload/ApiError");
const db = require('../config/database'); // get db conn
const logger = require("../config/logger");

// ========== User API DB Calls Starts From Here  ========== //
/**
 * Get All Users From Oracle Db
 */
const getAllUsers = async () => {
    // let query = `SELECT * FROM usersTbl`; non qouted cols
    let query = `SELECT * FROM USERS`; // qouted cols
    let result = await db.executeQuery(query);

    logger.info('All Users Are Being Fetched');
    return result;

}

/**
 * Get Single User From Oracle Db
 */
const getUserById = async(id) => {

    let query = `SELECT * FROM usersTbl WHERE id= id`;
    let result = await db.executeQuery(query);

    console.log(result);
    logger.info('A User By Id Is Being Fetched');
    return result;
}

/**
 * Create New User In Oracle Db
 */
 const create = async(user) => {
   
    let query = `INSERT INTO usersTbl(id,first_name,last_name,email,password,role)
    VALUES('${user.id}','${user.first_name}','${user.last_name}','${user.email}','${user.password}','${user.role}')`;
   
    let result = await db.executeQuery(query);

    logger.info('A New User Is Being Created!');
     return result;
  
}
/**
 * Update Single User In Oracle Db
 */
 const update = async(user) => {
    let query = `UPDATE usersTbl SET first_name='${user.first_name}', last_name= '${user.last_name}',
    email= '${user.email}', password= '${user.password}', role= '${user.role}`;
   
    let result = await db.executeQuery(query);

    logger.info('User Is Updated Successfully!');
     return result;

}

/**
 * Delete Single User In Oracle Db
 */
const userDelete = async(id)=>{
    let query = `DELETE usersTbl WHERE id = ${id}`;
    let result = await db.executeQuery(query);

    logger.info('A User Is Being Deleted!');
    return result;

}
// ========== User API DB Calls Ends To Here  ========== //

// ========== Bussiness Logic Implementation Starts From Here  ========== //
/**
 * Check User With Email and Password For Login Authentication
 */
const getUserByEmailAndPassword = async(email, password) => {
   let query = (`SELECT email, password FROM usersTbl WHERE email= '${email}' and password= ${password}`);
   let result = await db.executeQuery(query);
   
    logger.info('Authenticated User For Logged In');
    return result;
}

/**
 * Check if Id is Exist
 */
const isIdExist = async(id) => {
    let query = (`SELECT * FROM usersTbl WHERE id= '${id}'`);
    let result = await db.executeQuery(query);
   
    logger.info('A User With Id Check Is Fetched');
    return result;
}

/**
 * Check if Email is Exist
 */
const isEmailExist = async(email) => {
    let query = (`SELECT * FROM usersTbl WHERE email= '${email}'`);
    let result = await db.executeQuery(query);
   
    logger.info('A User With email Check Is Fetched');
    return result;  
 }
 // ========== Bussiness Logic Implementation Ends To Here  ========== //


module.exports = {
    create,
    getAllUsers,
    getUserById,
    getUserByEmailAndPassword,
    update,
    isIdExist,
    isEmailExist,
    userDelete
}
