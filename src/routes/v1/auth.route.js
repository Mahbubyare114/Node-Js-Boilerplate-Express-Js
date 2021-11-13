const express = require('express'); // import express
const router = express.Router(); // import express router
const {authController} = require('../../controller'); // import authController
const { permissionController } = require('../../controller'); // import permission controller
const { validate } = require('../../middlewares'); // import validate any schemas middleware
const {authValidator} = require("../../validations"); // import joi validation
const { authValidatorMiddleware, authrizationMiddleware } = require('../../middlewares');

// end points with authentication and authrization
router.post('/login', validate(authValidator.login), authController.login);
router.get('/permission', authValidatorMiddleware, authrizationMiddleware('viewAllPermissions'), permissionController.permissions); 
router.post('/register', authValidatorMiddleware,authrizationMiddleware('createUser'), validate(authValidator.register) , authController.register);


module.exports = router;