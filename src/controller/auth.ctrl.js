const status = require('http-status');
const { authService } = require('../service')
const { ApiResponse } = require('../payload/ApiResponse');
const { ApiError } = require('../payload/ApiError');
const {handleAsync} = require('../utils/util');

// ========== User API Service Calls Starts From Here  ========== //
const login = handleAsync(async(req, res) => {

/**
 * get the user email and password
 */
    let email = req.body.email;
    let password = req.body.password;

/**
 * return Api Response
 */    
    let loginResponse = await authService.login(email, password);

    let message = res.__('loginSuccess'); // i18n multi-lang support
    
   
    res.status(status.OK)
    .send(new ApiResponse(status.OK, message, loginResponse));

});


 /**
 * Register User Controller
 */
const register = handleAsync(async(req, res) => {
    
  /**
 * Get The User
 */
    let user = req.body;
    
 /**
 * Check If User Email Is Already Exist
 */
  let emailExist = await authService.isEmailExist(user.email); 
  console.log(`is email exist in auth ctrl: ${emailExist}`)

    if(emailExist){

    let message = res.__('emailExists');
   
     return res.status(status.NOT_ACCEPTABLE)
    .send(new ApiError (status.NOT_ACCEPTABLE , message));          
}

  /**
 * If Not Exist Then Register New User
 */
   let registerUserStatus = await authService.register(user);

   if(registerUserStatus){
    
        return res.status(status.OK)
       .send(new ApiResponse(status.OK, res.__('registerSuccess')));
   }

  /**
 * Display Internal Error if it Occurs
 */
   
  if (err){
        return res.status(status.INTERNAL_SERVER_ERROR)
            .send(new ApiError(status.INTERNAL_SERVER_ERROR, err));
    }
  
});
// ========== User API Service Calls Ends To Here  ========== //

module.exports ={
    login,
    register
}