const express = require('express'); // import express
const router = express.Router(); // import express router
const {authController} = require('../../controller'); // import authController
const { permissionController } = require('../../controller'); // import permission controller
const { validate } = require('../../middlewares'); // import validate any schemas middleware
const {authValidator} = require("../../validations"); // import joi validation
const { authentication, authorization } = require('../../middlewares');

// end points with authentication and authrization
router.post('/login', validate(authValidator.login), authController.login);
router.get('/permission', authentication, authorization('viewAllPermissions'), permissionController.permissions); 
router.post('/register', authentication, authorization('createUser'), validate(authValidator.register) , authController.register);


module.exports = router;