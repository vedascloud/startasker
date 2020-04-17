const statusCodes = require('../Core/StatusCodes');
const statusMessages = require('../Core/StatusMessages');
const paramValidations = require('./CustomerParamsValidation');
const dbQueries = require('./CustomerDBQueries');
const jwt = require('jsonwebtoken');
const config = require('../../app/ConfigFiles/config.json');

var socialMediaLogin = {

    socialMedia: (params, callback) => {
        const { error } = paramValidations.validateSocial_MediaLoginParams(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: statusCodes.failure,
                    message: error.details[0].message
                }
            });
        }
        var token = jwt.sign({ id: 'startasker' }, config.secretkey);
        if (params.register_type === 'Facebook') {
            if (params.userID !== '') {
                let getUser = dbQueries.getUserQueryFromUserId(params.userID);
                getUser.then((user_found) => {
                    if (user_found) {
                        if (user_found.register_type === params.register_type || user_found.register_type === 'Manual') {
                            if (user_found.Facebook.facebookID === params.ID) {
                                console.log('fb id matched..');
                                callback({
                                    status: 200,
                                    data: {
                                        response: statusCodes.success,
                                        message: "Customer login successfully",
                                        tokenID: token,
                                        customerInfo: user_found
                                    }
                                });
                                return;
                            }
                        }
                        let query = dbQueries.getFBCustomerUpdateQuery(params);
                        query.then((update) => {
                            if (update.ok == 1) {
                                callback({
                                    status: 200,
                                    data: {
                                        response: statusCodes.success,
                                        message: "Customer login successfully",
                                        tokenID: token,
                                        customerInfo: user_found
                                    }
                                });
                                return;
                            }
                        })
                    } else {
                        let insertFBQuery = dbQueries.getFacebookNewCustomerInsertQuery(params);
                        insertFBQuery.save((err) => {
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
                            let insertQuery = dbQueries.insertCustomerQuery(params);
                            insertQuery.save((err) => {
                                if (!err) {
                                    callback({
                                        status: 200,
                                        data: {
                                            response: statusCodes.success,
                                            message: "Customer login successfully",
                                            tokenID: token
                                        }
                                    });
                                    return;
                                }
                                callback({
                                    status: 200,
                                    data: {
                                        response: statusCodes.success,
                                        message: "Customer login successfully",
                                        tokenID: token
                                    }
                                });
                                return;
                            })
                        })
                    }
                })
            } else {
                let getUserByFbID = dbQueries.getUserQueryFromUserId(params.ID);
                getUserByFbID.then((found) => {
                    if (found) {
                        if (found.register_type === params.register_type) {
                            if (found.Facebook.facebookID === params.ID) {
                                console.log('fb id matched..');
                                callback({
                                    status: 200,
                                    data: {
                                        response: statusCodes.success,
                                        message: "Customer login successfully",
                                        tokenID: token,
                                        customerInfo: found
                                    }
                                });
                                return;
                            }
                        }
                    } else {
                        let insertFBQuery = dbQueries.getFacebookNewCustomerInsertQuery(params);
                        insertFBQuery.save((err) => {
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
                            let insertQuery = dbQueries.insertCustomerQuery(params);
                            insertQuery.save((err) => {
                                if (!err) {
                                    callback({
                                        status: 200,
                                        data: {
                                            response: statusCodes.success,
                                            message: "Customer login successfully",
                                            tokenID: token
                                        }
                                    });
                                    return;
                                }
                                callback({
                                    status: 200,
                                    data: {
                                        response: statusCodes.success,
                                        message: "Customer login successfully",
                                        tokenID: token
                                    }
                                });
                                return;
                            })
                        })
                    }
                })
            }
        } else {
            let getUser = dbQueries.getUserQueryFromUserId(params.userID);
            getUser.then((user_found) => {
                if (user_found) {
                    if (user_found.register_type === params.register_type || user_found.register_type === 'Manual') {
                        if (user_found.Google.GoogleID === params.ID) {
                            console.log('Google id matched..');
                            callback({
                                status: 200,
                                data: {
                                    response: statusCodes.success,
                                    message: "Customer login successfully",
                                    tokenID: token,
                                    customerInfo: user_found
                                }
                            });
                            return;
                        }
                    }
                    let query = dbQueries.getGoogleCustomerUpdateQuery(params);
                    query.then((update) => {
                        if (update.ok == 1) {
                            callback({
                                status: 200,
                                data: {
                                    response: statusCodes.success,
                                    message: "Customer login successfully",
                                    tokenID: token,
                                    customerInfo: user_found
                                }
                            });
                            return;
                        }
                    })
                } else {
                    let insertGoogleQuery = dbQueries.getGoogleNewCustomerInsertQuery(params);
                    insertGoogleQuery.save((err) => {
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
                        let insertQuery = dbQueries.insertCustomerQuery(params);
                        insertQuery.save((err) => {
                            if (!err) {
                                callback({
                                    status: 200,
                                    data: {
                                        response: statusCodes.success,
                                        message: "Customer login successfully",
                                        tokenID: token
                                    }
                                });
                                return;
                            }
                            callback({
                                status: 200,
                                data: {
                                    response: statusCodes.success,
                                    message: "Customer login successfully",
                                    tokenID: token
                                }
                            });
                            return;
                        })
                    })
                }
            })
        }
    }
}

module.exports = socialMediaLogin;