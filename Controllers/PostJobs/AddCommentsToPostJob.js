const statusCodes = require('../Core/StatusCodes');
const statusMessages = require('../Core/StatusMessages');
const paramValidations = require('../PostJobs/PostJobsParameterValidations');
const dbQueries = require('../PostJobs/PostJobsDBQueries');

var AddCommentToPost = {

    addComment: (params, callback) => {
        const { error } = paramValidations.validateAddCommentsToPostJobsParams(params);
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
        let postId = params.postID;
        let fetchQuery = dbQueries.getPostJobQueryFromPostId(postId);
        fetchQuery.then((isFound) => {
            if (isFound) {                
                let addCommentQuery = dbQueries.getPushCommentsToPostJobQuery(params);
                addCommentQuery.then((err) => {
                    console.log('data saved...')
                    if (!err) {
                        callback({
                            response: statusCodes.failure,
                            message: "Adding comment to postjob is failed"
                        });
                        return;
                    } else {
                        callback({
                            response: statusCodes.success,
                            message: "Adding comment to postjob is success"
                        });
                        return;
                    }
                })

            } else {
                callback({
                    response: statusCodes.failure,
                    message: "No job found to add comment"
                });
                return;
            }
        })
    }
}

module.exports = AddCommentToPost;