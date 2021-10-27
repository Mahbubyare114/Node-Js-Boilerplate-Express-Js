const joi = require('joi');

const login = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required()
 
    
   })
    
const register = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required()
});


module.exports = {
    login,
    register
}