const joi = require('joi');


    // create user schema object
    const createUser = joi.object({
        id : joi.number().required(),
        title: joi.string().required(),
        firstName: joi.string().required(),
        middleName: joi.string().optional(),
        lastName: joi.string().required(),
        email: joi.string().email().required(),
        age : joi.number().required().min(12).max(120),
        password: joi.string().min(6).required(),
        confirmPassword: joi.string().valid(joi.ref('password')).required(),
        role: joi.string().valid('Admin', 'User').required()
    });

    // update user
    const updateUser = joi.object({
        id : joi.number().required(),
        title: joi.string().required(),
        firstName: joi.string().required(),
        middleName: joi.string().optional().empty(),
        lastName: joi.string().required(),
        age: joi.number().required().min(12).max(120),
        password: joi.string().min(6).required(),
        confirmPassword: joi.string().valid(joi.ref('password')).required(),
        role: joi.string().valid('Admin', 'User').required()
    });




    module.exports = {
        createUser,
        updateUser
    }

