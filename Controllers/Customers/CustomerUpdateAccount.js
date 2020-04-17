const statusCodes = require('../Core/StatusCodes');
const statusMessages = require('../Core/StatusMessages');
const paramValidator = require('./CustomerParamsValidation');
const dbQueries = require('./CustomerDBQueries');

var customerUpdateAccount = {
    accountupdate: (params, callback) => {
        const { error } = paramValidator.UpdateAccountParams(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: statusCodes.failure,
                    message: error.details[0].message
                }
            });

        }
                let customer_profile_get_Query = dbQueries.getUserQueryFromUserId(params.userID);
                customer_profile_get_Query.then((isFound) => {
                    if (isFound) {
                        console.log("isfound", isFound);
                        let updateQuery = dbQueries.customerAccountUpdateQuery(params);
                        updateQuery.then((isUpdate) => {
                            if (isUpdate) {
                                callback({
                                    status: 200,
                                    data: {
                                        response: statusCodes.success,
                                        message: "Customer make on offer successfully"
                                    }
                                });
                                return;
                            } else {
                                return callback({
                                    status: 200,
                                    data: {
                                        response: statusCodes.failure,
                                        message: "Customermake on offer failed"
                                    }
                                });

                            }
                        });
                    }
                    else {
                        callback({
                            status: 200,
                            data: {
                                response: statusCodes.failure,
                                message: "Customer info not found"
                            }
                        });
                        return;
                    }

                });
    }
}


module.exports = customerUpdateAccount;