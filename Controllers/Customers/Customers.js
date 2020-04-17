const customerRegistration = require('./CustomerRegister');
const customerVerify = require('./CustomerVerify');
const customerLogin = require('./CustomerLogin')
const customerForgotPass = require('./CustomerForgotPassword');
const customerUpdateInfo = require('./CustomerProfileUpdate');
const ChangePassword =  require('./CustomerChangePassword');
const resetPassword = require('./CustomerRestPassword');
const usernameCheckAvailability = require('./CustomerUserIdCheckAvailablity');
const customerDelete = require('./DeleteCustomerAccount');
const social_mediaLogin = require('./CustomerSocial-MediaLogin');
const FetchCustomer = require('./CustomerFetch');
const CustomerSettings = require('./CustomerSettingsUpdate');
const CustomerSearchConfigUpdate = require('./CustomerUpdateSearchConfig');
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
    changePassword: (params, callback) => {
        return ChangePassword.changePassword(params,callback);
    },
    checkUserNameAvailablity: (params, callback) => {
        return usernameCheckAvailability.checkUserName(params,callback);
    },

    deleteAccount: (params,callback) => {
        return customerDelete.deleteMyAccount(params,callback);
    },
    social_media: (params, callback) => {
        return social_mediaLogin.socialMedia(params, callback);
    },
    fetch: (params,callback) => {
        return FetchCustomer.fetch(params,callback);
    },

    //customer settings start
    updateSkills: (params,callback) => {
        return CustomerSettings.updateSkills(params,callback);
    },
    updateAlerts: (params,callback) => {
        return CustomerSettings.updateTaksAlert(params,callback);
    },
    updateCustomAlerts: (params,callback) =>{
        return CustomerSettings.updateCustomeAlert(params,callback);
    },
    deleteCustomAlert: (params,callback) =>{
        return CustomerSettings.deleteCustomAlert(params,callback);
    },
    updateCustomerNotifications: (params, callback) =>{
        return CustomerSettings.updateCustomNotifications(params, callback);
    },
    updateSearchConfig: (params, callback) => {
        return CustomerSearchConfigUpdate.updateSearchConfigurations(params,callback);
    },
    dataupdate: (params, profilePic, headers, req, callback) =>{
        return customerUpdateProfile.updatedata(params, profilePic, headers, req, callback);
    },
    updateaccount: (params, callback) => {
        return customerUpdateAccount.accountupdate(params, callback);
    },
    updateaddress: (params, callback) => {
        return customerUpdateAddress.addressupdate(params, callback);
    },
    updatedob: (params, callback) => {
        return customerUpdateDOB.dobupdate(params, callback);
    },
    updatemobileno: (params,callback) =>{
        return customerUpdateMobileno.mobilenoupdate(params,callback)
    }
   

}

module.exports = customer;