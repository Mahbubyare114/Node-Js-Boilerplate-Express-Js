const {executeQuery} = require('../config/database'); // get db conn
const logger = require('../config/logger');

// get all permissions list
const getPermissions = async () => {
    return await executeQuery('select * from permissions',[]); // return all permission
  };
 

  //get role permissions -> (roleId, roleName, PermissionName)
const getRolePermissions = async(roleName) => {
    return await executeQuery(`
    select role.roleid, role.rolename, permission.permissionname from rolepermissions roleperm
    inner join roles role on role.roleid = roleperm.roleid
    inner join permissions permission on permission.permissionid = roleperm.permissionid
        where rolename= :roleName`,[roleName]); // return all role permission
  };
 

  module.exports = 
  { 
    getPermissions, 
    getRolePermissions 
  };