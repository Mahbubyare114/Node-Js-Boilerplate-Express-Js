let status = require('http-status');
const {ApiError} = require('../payload/ApiError');
const logger = require('../config/logger');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    // check headers for access token
   //let token = req.headers['x-access-token'];
    let token = req.headers['authorization'];
    //let token = reqHeader.split(' ')[1];
    if(!token){
        logger.warn('Someone Is Trying To Get Access Without Token!!');
        throw new ApiError(401, 'Plz Enter Your Access Token');
    } 

    let response = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if(response && response.user){
        logger.info('Authenticated User');
        next();
    }
    // throw new ApiError(401, 'Your Authentication is Expired for Now!, Plz Login Again');
    
}

module.exports = {
    auth
}