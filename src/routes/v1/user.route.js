const express = require('express');
const router = express.Router();
const { userController } = require('../../controller');
const {userValidator} = require("../../validations");
const {validate} = require('../../middlewares');
const { authValidatorMiddleware, authrizationMiddleware } = require('../../middlewares');


router.get('/test', authValidatorMiddleware, userController.testCall); // end point for testing i18n
router.post('/create', authValidatorMiddleware, authrizationMiddleware('createUser'), validate(userValidator.createUser), userController.create); // create user end point
router.patch('/update', authValidatorMiddleware, authrizationMiddleware('updateUser'), validate(userValidator.updateUser) ,userController.update); // update by email end point
router.get('/getAllUsers', authValidatorMiddleware, authrizationMiddleware('viewAllUsers') ,userController.getAllUsers); // get all users end point
router.get('/getUserByEmail', authValidatorMiddleware ,authrizationMiddleware('viewUserByEmail'), userController.getUserByEmail); // get user by email end point
router.delete('/DeleteByEmail', authValidatorMiddleware, authrizationMiddleware('deleteUser'), userController.delet); // delete user by email end point

module.exports = router;