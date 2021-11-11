const express = require('express');
const router = express.Router();
const {authController} = require('../../controller');
const validate = require('../../middlewares/validator');
const {authValidator} = require("../../validations");
const {authValidatorMiddleware} = require('../../middlewares');





router.post('/login', validate(authValidator.login), authController.login);
router.post('/register', authValidatorMiddleware.auth , validate(authValidator.register) , authController.register);

module.exports = router;