const statusCodes = require('../Core/StatusCodes');
const GenerateOTP = require('../Core/GenerateOTP');
const statusMessages = require('../Core/StatusMessages');
const paramValidations = require('./CustomerParamsValidation');
const dbQueries = require('./CustomerDBQueries');
const Mailer = require('../Core/Mailer');


var customerRegister = {

    registration: (params, callback) => {
        const { error } = paramValidations.validateParams(params);
        if (error) {
             callback({
                status: 400,
                data: {
                    response: statusCodes.failure,
                    message: error.details[0].message
                }
            });
            return;
        }

        let customer_query = dbQueries.getCustomerQuery(params);
        customer_query.then((isFound) => {
            if (isFound) {
                if (isFound.register_type !== 'Manual') {
                    callback({
                        status: 200,
                        data: {
                            response: statusCodes.failure,
                            message: "Customer already logged in with " + isFound.register_type
                        }
                    });
                    return;
                }
                else if (isFound.verification_status === true) {
                    callback({
                        status: 200,
                        data: {
                            response: statusCodes.failure,
                            message: "Customer already having account withus."
                        }
                    });
                    return;
                } else {
                    let otp = GenerateOTP.generateOTP();
                    let updateQuery = dbQueries.unVerifiedCustomerQuery(params, otp);
                    updateQuery.then((update) => {
                        if (update.ok == 1) {
                            Mailer.userOTPSentToMail('Registration - OTP', params.userID, otp);
                            callback({
                                status: 200,
                                data: {
                                    response: statusCodes.success,
                                    message: "Customer registered successfully. Please verify account with OTP",
                                    otp: otp
                                }
                            });
                            return;
                        }
                    })

                }
            } else {
                let otp = GenerateOTP.generateOTP();
                let newUser = dbQueries.newCustomerInsertQuery(params, otp);
                newUser.save((err) => {
                    if (err) {
                        callback({
                            status: 200,
                            data: {
                                response: statusCodes.failure,
                                message: err
                            }
                        });
                        return
                    }
                    Mailer.userOTPSentToMail('Registration - OTP', params.userID,otp);
                    callback({
                        status: 200,
                        data: {
                            response: statusCodes.success,
                            message: "Customer registered successfully. Please verify account with OTP",
                            otp: otp
                        }
                    });
                });
            }
        });


    }

}

module.exports = customerRegister;