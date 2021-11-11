const express = require('express');
const router = express.Router();
const { userController } = require('../../controller');
const {userValidator, authValidator} = require("../../validations");
const {validate} = require('../../middlewares');
const {authValidatorMiddleware} = require('../../middlewares');


router.get('/test', authValidatorMiddleware.auth, userController.testCall); // end point for testing i18n
router.post('/create', authValidatorMiddleware.auth, validate(userValidator.createUser), userController.create); // create user end point
router.patch('/update', authValidatorMiddleware.auth,validate(userValidator.updateUser) ,userController.update); // update by email end point
router.get('/getAllUsers', authValidatorMiddleware.auth ,userController.getAllUsers); // get all users end point
router.get('/getUserByEmail', authValidatorMiddleware.auth ,userController.getUserByEmail); // get user by email end point
router.delete('/DeleteByEmail', authValidatorMiddleware.auth ,userController.delet); // delete user by email end point


module.exports = router;