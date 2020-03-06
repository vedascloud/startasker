const statusCodes = require('../Core/StatusCodes');
const paramValidations = require('../PostJobs/PostJobsParameterValidations');
const dbQueries = require('../PostJobs/PostJobsDBQueries');

var fetchPostJobs = {
    fetch: (params, callback) => {
        const { error } = paramValidations.validateFetchJobParams(params);
        if (error) {
            callback({
                status: 400,
                data: {
                    response: statusCodes.failure,
                    message: error.details[0].message
                }
            })
            return
        }
        let fetchQuery = dbQueries.getPostJobQueryFromId(params);
        fetchQuery.then((ifFound) => {
            if (ifFound) {
                return callback({
                    status: 200,
                    data: {
                        response: statusCodes.success,
                        message: "Jobs fetched successfully",
                        jobsData: ifFound
                    }
                });
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: statusCodes.failure,
                        message: "Jobs fetched failed",
                        jobsData: ifFound
                    }
                });
            }
        });
    },
    fetchAllJobs: (callback) => {

        let fetchQuery = dbQueries.getAllPostJobsQuery();
        fetchQuery.then((find) => {            
            callback({ status: 200, 
                data: { 
                    response: statusCodes.success, 
                    message: "Post jobs fetched successfully" ,
                    findJobs: find
                } });
            return;

           
        }).catch((error) => {
            console.log(error);
        })
    }
}

module.exports = fetchPostJobs;