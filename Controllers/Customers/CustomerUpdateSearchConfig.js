const statusCodes = require('../Core/StatusCodes');
const statusMessages = require('../Core/StatusMessages');
var paramValidator= require('./CustomerParamsValidation');
var dbQueries = require('./CustomerDBQueries');

var updateCustomerSearchConfig = {
 
    updateSearchConfigurations:(params,callback) =>{
        const { error } = paramValidator.validateSearchConfigurationParams(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: statusCodes.failure,
                    message: error.details[0].message
                }
            });
        }
        let getCustomerWithId = dbQueries.getUserQueryFromUserId(params.userID);
        getCustomerWithId.then((isFound) => {
            if(isFound){
                let update = dbQueries.getUpdateCustomerSearchConfig(params);
                update.then((isUpdated) =>{
                    if(isUpdated){
                        let getData = dbQueries.getJobsBasedOnCustomerSearchConfig(params);
                        getData.then((found) =>{
                            if(found){
                                callback({ 
                                    status: 200, 
                                    data: { 
                                        response: statusCodes.success, 
                                        message: "Mathed data fetched successfully" ,
                                        postData: found
                                    } 
                                });
                                return;
                            }else{
                                callback({ 
                                    status: 200, 
                                    data: { 
                                        response: statusCodes.failure, 
                                        message: "Mathed data not found" ,
                                        postData: found
                                    } 
                                });
                                return;
                            }
                        })
                    }
                })
            }else{
                callback({ 
                    status: 200, 
                    data: { 
                        response: statusCodes.failure, 
                        message: "No data found. Please register with us"
                    } 
                });
                return;
            }
        });      
    }
}

module.exports = updateCustomerSearchConfig;