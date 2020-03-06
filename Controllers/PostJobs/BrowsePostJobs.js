const statusCodes = require('../Core/StatusCodes');
const statusMessages = require('../Core/StatusMessages');
const paramValidations = require('../PostJobs/PostJobsParameterValidations');
const dbQueries = require('../PostJobs/PostJobsDBQueries');

var BrowsePostJobs = {

    browseJob: (params, callback) => {
        const { error } = paramValidations.validateBroseJobParams(params);
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

        if (params.keyword !== "" && params.location === "" && params.categories.length === 0) {
            console.log('enterd into keyword..')
            let browseQuery = dbQueries.getBrowseJobQueryFromKeyword(params);
            browseQuery.then((ifFound) => {
                if (ifFound) {
                    callback({
                        status: 200,
                        data: {
                            response: statusCodes.success,
                            message: "Fetched data successfully",
                            findJobs: ifFound
                        }
                    });
                    return;
                } else {
                    callback({
                        status: 200,
                        data: {
                            response: statusCodes.failure,
                            message: "Fetched data failed",
                            findJobs: []
                        }
                    });
                    return;
                }
            })
        } else if (params.keyword !== "" && params.location !== "" && params.categories.length === 0) {

        } else if (params.keyword === "" && params.location !== "" && params.categories.length === 0) {
            let browseQuery = dbQueries.getBrowseJobQueryFromLocation(params);
            browseQuery.then((ifFound) => {
                if (ifFound) {
                    callback({
                        status: 200,
                        data: {
                            response: statusCodes.success,
                            message: "Fetched data successfully",
                            findJobs: ifFound
                        }
                    });
                    return;
                } else {
                    callback({
                        status: 200,
                        data: {
                            response: statusCodes.failure,
                            message: "Fetched data failed",
                            findJobs: []
                        }
                    });
                    return;
                }
            })
        } else if (params.keyword === "" && params.location !== "" && params.categories.length > 0) {

        } else if (params.keyword === "" && params.location === "" && params.categories.length > 0) {
            
            let browseQuery = dbQueries.getBrowseJobQueryFromCategory(params);
            browseQuery.then((ifFound) => {
                if (ifFound) {
                    callback({
                        status: 200,
                        data: {
                            response: statusCodes.success,
                            message: "Fetched data successfully",
                            findJobs: ifFound
                        }
                    });
                    return;
                } else {
                    callback({
                        status: 200,
                        data: {
                            response: statusCodes.failure,
                            message: "Fetched data failed",
                            findJobs: []
                        }
                    });
                    return;
                }
            })
        }
        else {
            
            let browseQuery = dbQueries.getBrowseJobQueryFromName(params);
            browseQuery.then((ifFound) => {
                if (ifFound) {
                    callback({
                        status: 200,
                        data: {
                            response: statusCodes.success,
                            message: "Fetched data successfully",
                            findJobs: ifFound
                        }
                    });
                    return;
                } else {
                    callback({
                        status: 200,
                        data: {
                            response: statusCodes.failure,
                            message: "Fetched data failed",
                            findJobs: []
                        }
                    });
                    return;
                }
            })
        }


    }

}

module.exports = BrowsePostJobs;