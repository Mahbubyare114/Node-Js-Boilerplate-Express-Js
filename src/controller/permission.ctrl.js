const { permissionService } = require("../services"); // import per
const { ApiResponse } = require('../payload/ApiResponse'); // import Api Response
const {handleAsync} = require('../utils/util'); // import handleAsync from util
const status = require('http-status'); // import http status


const permissions = handleAsync(async (req, res) => {
    let permissionList = await permissionService.getPermissions() 
    res.status(status.OK).send(new ResponseApi(200, permissionList));
  });
  module.exports = { permissions };