const { permissionService } = require("../service"); // import per
const { ApiResponse } = require('../payload/ApiResponse'); // import Api Response
const {handleAsync} = require('../utils/util'); // import handleAsync from util
const status = require('http-status'); // import http status


const permissions = handleAsync(async (req, res) => {
    let permissionList = await permissionService.getPermissions() 
    res.status(status.OK).send(new ApiResponse(status.OK, permissionList));
  });
  module.exports = { permissions };