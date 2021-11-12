const {executeQuery} = require('../config/database'); // get db conn

// get all permissions start
const getPermissions = async () => {
    return await executeQuery('select * from permissions'); // return all permission
  };
  // get all permissions end

  //get role permissions start
const getRolePermissions = async () => {
    return await executeQuery(`
    select role.roleid, role.rolename, permission.permissionname from rolepermissions roleperm
        inner join roles role on role.roleid = roleperm.roleid
        inner join permissions permission on permission.permissionid= roleperm.permissionid`,[]); // return all role permission
  };
  //get role permissions end

  module.exports = { getPermissions, getRolePermissions };