const { ApiError } = require("../payload/ApiError");
const db = require('../config/database');
const logger = require("../config/logger");

// static database
const users = [{
    "id" : 1,
    "title" : "Programmer" ,
    "firstName" : "Abdulkadir" ,
    "lastName" : "Abdullahi",
    "email" : "Abdulkadir@example.com",
    "age" : 45, 
    "password": "abdulkadir123",
    "role" : "User"
},
{
    "id" : 2,
    "title" : "Develoer" ,
    "firstName" : "Mahbub" ,
    "lastName" : "Abdullahi",
    "email" : "mahbub@example.com",
    "age" : 35, 
    "password": "mahbub123",
    "role" : "Admin"
}];

// get all users from the oracle db
const getAllUsers = async () => {
    let query = `SELECT * FROM USERS`;
    let result = await db.executeQuery(query);

    logger.info('All Users Are Being Fetched');
    return result;
    

}

// get a single user from the oracle db
const getUserById = async(id) => {

    let query = `SELECT * FROM USERS WHERE id= ${id}`;
    let result = await db.executeQuery(query);

    logger.info('A Single User Is Being Fetched');
    return result;
}


// const getUserById = (id) => {
//     return users.filter(u => u.id === id);
// }

const getUserByEmailAndPassword = (email, password) => {
    // throw new  ApiError(403, "Database Query Failed");

    return users.filter(u => u.email === email && u.password === password);
}

const create = (user) => {

    logger.info('A New User Is Being Created!');

    users.push(user);
    return true;
}

const update = (user) => {
    userFilter = users.filter(u => u.id == user.id);
    userFilter.map((value, index) =>{
        userFilter[index].firstName = user.firstName;
        userFilter[index].lastName = user.lastName;
        userFilter[index].password = user.password; 
        userFilter[index].role = user.role;
    });

    return true;


}

const userDelete = (user) => {
    userFilter = users.filter(u => u.id == user.id);
    userFilter.map((value, index) =>{
    users.splice(index, 1);
    });

    return true;
}

const isIdExist = (id) => {
   return users.filter(u => u.id === id).length; 
    // ? true : false;
}

const isEmailExist = (email) => {
    return users.filter((u => u.email === email).length > 0); 
     
 }
 


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
