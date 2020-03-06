const paramValidations = require('./CustomerParamsValidation');
const dbQueries = require('./CustomerDBQueries');
const statusCodes = require('../Core/StatusCodes');

var customerCheckAvailability = {

    checkUserName: (params,callback) =>{
        const { error } = paramValidations.validateForgotPasswordParams(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: statusCodes.failure,
                    message: error.details[0].message
                }
            });
        }
        let loginQuery = dbQueries.getUserQueryFromUserId(params.userID);
        loginQuery.then((user) => {
            if(!user){
                return callback({
                    status: 200,
                    data: {
                        response: statusCodes.failure,
                        message: "email is not available"
                    }
                });       
            }else{
                return callback({
                    status: 200,
                    data: {
                        response: statusCodes.success,
                        message: "email is already used"
                    }
                });        
            }
        });
            
    }
}

module.exports = customerCheckAvailability;