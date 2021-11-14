let status = require("http-status");
const { ApiError } = require("../payload/ApiError");
const logger = require("../config/logger");
const jwt = require("jsonwebtoken");
const { permissionService } = require("../service");
const NodeCache = require("node-cache"); // Initialize
const myCache = new NodeCache();

/**
 * authentication middleware
 */
const authentication = (req, res, next) => {
  let token = req.header("authorization");

  if (!token) {
    logger.warn("Someone Is Trying To Get Access Without Token!!");
    throw new ApiError(401, "Plz Enter Your Access Token");
  }

  try {
    //token = token.split(" ")[1];
    let response = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (response) {
      console.log("Authenticated User With Token Logged In");

      let decoded = jwt.decode(token, { complete: true });
      myCache.set("decodedToken", decoded);
      next();
    }
  } 
  catch (err) {
    console.log(`Error From Authentication Middleware ${err}`);
    throw new ApiError(401,"Your authentication is Not Valid, Your Token Expired");
  }
};

/**
 * authrization middleware
 */
const authorization = (apiName) => (req, res, next) => {
  try {
    let data = myCache.get("decodedToken");
    console.log(data.payload.rolename);

    let userRole = data.payload.rolename;
    console.log(`user role in authorization: ${userRole}`);

    
  permissionService.getRolePermissions(userRole)
    .then((res)=>{
  
   if (res.filter((p) => p.permissionname == apiName).length > 0) {
        return next()
      }
     
      next(new ApiError(401, "You Can Not Access This Endpoint, Ask For Permission!!")); 

      
    })
    .catch(err=> Promise.reject(err));

  } catch (err) {
    console.log(err);
    throw new ApiError(401, "You Can Not Access This Endpoint");
  }
      };

module.exports = {
  authentication,
  authorization,
};
