const status = require('http-status');
const { ApiError } = require('../payload/ApiError');

// validate request body against schema => (Generic validator b/c schema can be anything)
const validate = (schema)=> (req, res , next) =>{
// on the value, error validate schema req.body
  let {value , error} = schema.validate(req.body);

if(error){
// on fail return error msg and http-status to the user
    let message = error.details[0].message;
    //let errorMessage = {status : status.BAD_REQUEST, message: message}
    let state = status.BAD_REQUEST;
    return res.status(state).send(new ApiError(state, message));
}
// on success trigger next middleware function
  next();
}

module.exports = validate;





