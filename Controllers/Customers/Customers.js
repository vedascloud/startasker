const customerRegistration = require('./CustomerRegister');
const customerVerify = require('./CustomerVerify');
const customerLogin = require('./CustomerLogin')
const customerForgotPass = require('./CustomerForgotPassword');
const customerUpdateInfo = require('./CustomerProfileUpdate');
const resetPassword = require('./CustomerRestPassword');
const usernameCheckAvailability = require('./CustomerUserIdCheckAvailablity');
const customerDelete = require('./DeleteCustomerAccount');
const social_mediaLogin = require('./CustomerSocial-MediaLogin');
var customer = {

    registration: (params, callback) => {
        return customerRegistration.registration(params, callback);
    },

    verify: (params, callback) => {
        return customerVerify.verify(params,callback);
    },
    login: (params, callback) => {
        return customerLogin.login(params,callback);
    },
    forgotpassword: (params, callback) => {
        return customerForgotPass.forgot(params,callback);
    },
    update: (params, profilepic, headers, req, callback) =>{
        return customerUpdateInfo.update(params, profilepic, headers, req, callback);
    },
    reset: (params, callback) => {
        return resetPassword.restpassword(params,callback);
    },
    checkUserNameAvailablity: (params, callback) => {
        return usernameCheckAvailability.checkUserName(params,callback);
    },

    deleteAccount: (params,callback) => {
        return customerDelete.deleteMyAccount(params,callback);
    },
    social_media: (params, callback) => {
        return social_mediaLogin.socialMedia(params, callback);
    }
}

module.exports = customer;