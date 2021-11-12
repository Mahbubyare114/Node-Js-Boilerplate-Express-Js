const { ApiError } = require("../payload/ApiError");
const db = require('../config/database');
const logger = require("../config/logger");

// ========== User API DB Calls Starts From Here  ========== //
/**
 * Get All Users From Oracle Db
 */
const getAllUsers = async () => {

    logger.info('All Users Are Being Fetched');
    return await db.executeQuery(`SELECT * FROM USERS`,[]);
}

/**
 * Get Single User From Oracle Db
 */
const getUserByEmail = async(email) => {

    //let email = email.email;

    let result = await db.executeQuery(`SELECT * FROM USERS WHERE EMAIL= :email`, [email]);
    
    

    logger.info('A User By Email Is Being Fetched');
    return result;
}

/**
 * Create New User In Oracle Db
 */
 const create = async(user) => {

    let email = user.email;
    let password = user.password;
    let fullName = user.fullName;
    let active = 0;

    let result = await db.executeQuery(`INSERT INTO USERS (USERID, EMAIL, PASSWORD, FULLNAME, ACTIVE)
    VALUES (USER_SEQ.nextval, :email, :password, :fullName,:active)`
    , [email, password, fullName, active]);

    if (result.rowsAffected === 1){

        logger.info('A New User Is Being Inserted!');
    return true;
    }
   
return false;
   
    
}
/**
 * Update Single User In Oracle Db
 */
 const update = async(user) => {
    let email = user.email;
    let password = user.password;
    let fullName = user.fullName;
    let active = 0;


    let result = await db.executeQuery(`UPDATE USERS SET PASSWORD=:password,
    FULLNAME= :fullName, ACTIVE= :active WHERE EMAIL= :email`, [password, fullName, active, email])
   
    if (result.rowsAffected === 1){

    logger.info('Is User Is Updated Successfully!');
     return true;

    }
    return false;

}

/**
 * Delete Single User By Email In Oracle Db
 */
const userDelete = async(email)=>{
    // let useremail = email.email;
    let result = await db.executeQuery(`DELETE USERS WHERE email=:email`,[email]);
  

    logger.info('A User Is Being Deleted!');
    return result;

}
// ========== User API DB Calls Ends To Here  ========== //


// ========== Bussiness Logic Implementation Starts From Here  ========== //
/**
 * Check User With Email and Password For Login Authentication
 */
const getUserByEmailAndPassword = async(email, password) => {
    let result = await db.executeQuery(`SELECT U.USERID, U.FULLNAME, U.EMAIL, R.ROLENAME
    FROM USERS U
             INNER JOIN USERROLE UR on U.USERID = UR.userId
             INNER JOIN ROLES R on UR.roleId = R.ROLEID
    WHERE EMAIL = :email
      AND PASSWORD = :password
      AND ACTIVE = 1`, [email, password])

      

      if (!result)
      return null;
      
      logger.info('Authenticated User Logged In The Database');
     return result[0];    
   
}

/**
 * Check if Email is Exist
 */
const isEmailExist = async(email) => {
    let result = await db.executeQuery(`SELECT COUNT(*) AS emailAlreadyExist from USERS WHERE EMAIL = :email`
    , [email]);

    console.log(result);
    if(result[0].emailalreadyexist > 0)

        return true;
        
    
    return false;

   
    // return result;  
 }
 // ========== Bussiness Logic Implementation Ends To Here  ========== //


module.exports = {
    create,
    getAllUsers,
    getUserByEmail,
    getUserByEmailAndPassword,
    update,
    isEmailExist,
    userDelete
}
