const statusCodes = require('../Core/StatusCodes');
const statusMessages = require('../Core/StatusMessages');
const paramValidations = require('../PostJobs/PostJobsParameterValidations');
const dbQueries = require('../PostJobs/PostJobsDBQueries');

var AddOfferToPost = {

    addOffer: (params, callback) => {
        const { error } = paramValidations.validateAddOffersToPostJobsParams(params);
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
        let Query = dbQueries.getPostJobQueryFromPostId(params.postID);
        Query.then((isFound) => {
            if (isFound) {
                var count = isFound.jobAppliedCount+1;
                var authoremail;
                for (var i = 0; i < isFound.offers.length; i++) {
                    authoremail = isFound.offers[i].offeredUserID;
                    //console.log("isFound",authoremail);
                }
                if(authoremail !== params.offeredUserID){
                    let ratings = 5;
                    ///let offerid = "Offer_"+GenerateID.makeId();
                    let addOfferQuery = dbQueries.getOfferQuery(params,ratings);
                    addOfferQuery.then((saved) => {
                        console.log('data saved...')
                        let Updatequery = dbQueries.getUpdateJobAppliedCount(params,count);
                        Updatequery.then((err) =>{
                            if (!err) {
                                callback({
                                    status: 200,
                                    data:{
                                        response: statusCodes.failure,
                                        message: "Adding offer to postjob is failed"
                                    }
                                });
                                return;
                            } else {
                                callback({
                                    status: 200,
                                    data: {
                                        response: statusCodes.success,
                                        message: "Adding offer to postjob is success"
                                    }

                                });
                                return;
                            }
                        })
                    })

                } else {
                    callback({
                        status: 200,
                        data: {
                            response: statusCodes.failure,
                            message: "You already applied for this job"
                        }
                    });
                    return;
                }
            } else {
                callback({
                    status: 200,
                    data: {
                        response: statusCodes.failure,
                        message: "No job data Found"
                    }
                });
                return;
            }
        })
    },
    replayToOfferMessage:(params, callback) =>{
        const { error } = paramValidations.validateReplayToOfferMessages(params);
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
        let Query = dbQueries.getPostJobQueryFromPostId(params.postID);
        Query.then((isFound) => {
            if(isFound){
                var authoremail;
                for (var i = 0; i < isFound.offers.length; i++) {
                    authoremail = isFound.offers[i].offeredUserID;
                    //console.log("isFound",authoremail);
                }
                if(authoremail !== params.offeredUserID){
                    callback({
                        status: 200,
                        data: {
                            response: statusCodes.failure,
                            message: "You have not applied for this post to give replay."
                        }
                    });
                }else{
                    let replayQuery = dbQueries.getGivingReplayToOfferMessageQuery(params);
                    replayQuery.then((success)=>{
                        //console.log('error..',err);
                        if(success){
                            callback({
                                status: 200,
                                data: {
                                    response: statusCodes.success,
                                    message: "Message send successfully"
                                }
                            });
                            return;
                        }else{
                            callback({
                                status: 200,
                                data: {
                                    response: statusCodes.failure,
                                    message: "Message send failed"
                                }
                            });
                            return;
                        }
                    })
                }
            }else{
                callback({
                    status: 200,
                    data: {
                        response: statusCodes.failure,
                        message: "No job data Found"
                    }
                });
                return;
            }
        })
    }
}

module.exports = AddOfferToPost;