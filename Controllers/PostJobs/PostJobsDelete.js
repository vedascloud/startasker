const statusCodes = require('../Core/StatusCodes');
const statusMessages = require('../Core/StatusMessages');
const paramValidations = require('../PostJobs/PostJobsParameterValidations');
const dbQueries = require('../PostJobs/PostJobsDBQueries');
var fs = require('fs');

var deletePostJob = {

    deleteJob:(params,callback) => {
        const { error } = paramValidations.validateDeleteJobParams(params);
        if (error) {
            callback({
                status: 400,
                data: {
                    response: statusCodes.failure,
                    message: error.details[0].message
                }
            })
            return;
        }
        let getJobQuery = dbQueries.getPostJobQueryFromPostId(params.postId);
        getJobQuery.then((found) => {
            if(found){     
                console.log('db data..',found.images);           
                return deletePostJobs(found.images,callback, params);
            }else{
                callback({
                    status: 200,
                    data: {
                        response: statusCodes.failure,
                        message: "No job found to delete"
                    }
                });
                return;
            }
        })
    }


}

function deletePostJobs(images,callback,params){
    let deleteJobQuery = dbQueries.getDeletePostJobQuery(params.postId);
    deleteJobQuery.then((isDelete) => {
        if(isDelete){           
            for (let attachment of images){
                    fs.unlink('./public' + attachment, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                    });
                }
            
            callback({
                status: 200,
                data: {
                    response: statusCodes.success,
                    message: "Job deleted successfully"
                }
            });
            return;
        }else{
            callback({
                status: 200,
                data: {
                    response: statusCodes.failure,
                    message: "Job deleted failed"
                }
            });
            return;
        }
    })

}

module.exports = deletePostJob;