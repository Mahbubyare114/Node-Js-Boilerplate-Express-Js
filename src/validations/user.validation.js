const joi = require('joi');


    // create user schema object
    const createUser = joi.object({
        id : joi.number().required(),
        firstName: joi.string().required(),
        middleName: joi.string().optional(),
        lastName: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().min(6).required(),
        role: joi.string().valid('admin', 'user').required()
    });

    // update user
    const updateUser = joi.object({
        id : joi.number().required(),
        firstName: joi.string().required(),
        middleName: joi.string().optional().empty(),
        lastName: joi.string().required(),
        password: joi.string().min(6).required(),
        role: joi.string().valid('Admin', 'User').required()
    });




    module.exports = {
        createUser,
        updateUser
    }

