const joi = require('joi');


    // create user schema object
    const createUser = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required(),
        fullName: joi.string().required()
    });

    // update user
    const updateUser = joi.object({
        fullName: joi.string().required(),
        password: joi.string().min(6).required(),
        email : joi.string().email().required(),
        active: joi.number().valid(0,1)
    
    });

    const deleteUser = joi.object({
        email : joi.string().email().required()

    });

    const getUserByEmail = joi.object({
        email : joi.string().email().required()

    });
    

    module.exports = {
        createUser,
        updateUser,
        deleteUser,
        getUserByEmail
    }

