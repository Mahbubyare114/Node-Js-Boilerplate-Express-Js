const { permisionModel } = require('../model'); // import permission model

/**
 * get all permissions,RolePermissions and return result back to (.then promise) in auth middleware
 * return keyword is not needed if its single line b/c of self return 
 */
const getPermissions = () => permisionModel.getPermissions(); // get permision list from the model
const getRolePermissions = (userRole) => permisionModel.getRolePermissions(userRole); // get rolePermision list from the model

module.exports = 
{ 
  getPermissions,
  getRolePermissions 
};