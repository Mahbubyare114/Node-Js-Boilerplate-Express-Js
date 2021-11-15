const express = require('express');
const router = express.Router();
const { userController } = require('../../controller');
const {userValidator} = require("../../validations");
const {validate} = require('../../middlewares');
const { authentication, authorization } = require('../../middlewares');


router.get('/test', authentication, userController.testCall); // end point for testing i18n
router.get('/getAllUsers', authentication, authorization('viewAllUsers') ,userController.getAllUsers); // get all users end point

router.post('/create', authentication, authorization('createUser'),
 validate(userValidator.createUser), userController.create); // create user end point

router.patch('/update', authentication, authorization('updateUser'), 
 validate(userValidator.updateUser) ,userController.update); // update by email end point

router.get('/getUserByEmail', authentication, authorization('viewUserByEmail'),
 validate(userValidator.getUserByEmail), userController.getUserByEmail); // get user by email end point

router.delete('/DeleteByEmail', authentication, authorization('deleteUser'), 
 validate(userValidator.deleteUser) , userController.delet); // delete user by email end point

module.exports = router;