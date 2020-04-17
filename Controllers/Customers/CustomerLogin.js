const statusCodes = require('../Core/StatusCodes');
const statusMessages = require('../Core/StatusMessages');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../app/ConfigFiles/config.json');
const paramValidations = require('./CustomerParamsValidation');
const dbQueries = require('./CustomerDBQueries');

var customerLogin = {
    login: (params, callback) => {
        const { error } = paramValidations.validateLoginParams(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: statusCodes.failure,
                    message: error.details[0].message
                }
            });
        }
        let loginQuery = dbQueries.getCustomerQuery(params);
        loginQuery.then((user) => {
            if (user) {
                var fbpassword = bcrypt.compareSync('startasker', user.password);
                if(fbpassword){
                    callback({ status: 200, data: { response: statusCodes.failure, message: "You have already logged in from social media so please set your password" } });
                    return;
                }
                var validPassword = bcrypt.compareSync(params.password, user.password);                
                if (!validPassword) {
                    callback({ status: 200, data: { response: statusCodes.failure, message: "Login failed, either username/password is wrong" } });
                    return;
                } 
                 if (user.verification_status === true) {
                    var token = jwt.sign({ id: user.userID }, config.secretkey);
                    let insertQuery = dbQueries.insertCustomerQuery(params);
                    insertQuery.save((err) =>{
                        if(!err){
                            callback({
                                status: 200,
                                data: {
                                    response: statusCodes.success,
                                    message: "Customer user login success",
                                    access_token: token,
                                    customerInfo: user
                                }
                            });
                            return;
                        }
                        callback({
                            status: 200,
                            data: {
                                response: statusCodes.success,
                                message: "Customer user login success",
                                access_token: token,
                                customerInfo: user
                            }
                        });
                        return;
                    })
                   
                } else {
                    callback({ status: 200, data: { response: statusCodes.verificationPending, message: "Customer is registered but verification is pending" } });
                    return;
                }
            } else {
                callback({ status: 200, data: { response: statusCodes.failure, message: "No data found with us. Please register with us" } });
                return
            }

        }).catch((error) => {
            console.log(error);
        })
    }
}

module.exports = customerLogin;