const express = require('express');
const router = express.Router();
const { userController } = require('../../controller');
const {userValidator, authValidator} = require("../../validations");
const {validate} = require('../../middlewares');
const {authValidatorMiddleware} = require('../../middlewares');



router.post('/create',validate(userValidator.createUser), userController.create); // user obj validation
router.patch('/update',validate(userValidator.updateUser) ,userController.update); // update by Id
router.get('/getAllUsers', authValidatorMiddleware.auth ,userController.getAllUsers); 
//router.get('/:getUserById',userController.getUserById); // UserId validation
router.delete('/DeleteById',userController.delet); // delete by id


module.exports = router;