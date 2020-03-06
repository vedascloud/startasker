var InsertPostJobs = require('../PostJobs/InsertPostJobs');
var FetchPostJobs = require('../PostJobs/PostJobsFetching');
var UpdatePostJobs = require('../PostJobs/PostJobsUpdate');
var BrowsePostJobs = require('../PostJobs/BrowsePostJobs');
var DeletePostJob = require('../PostJobs/PostJobsDelete');
var AddJobToFavorite = require('../PostJobs/AddPostJobToFavourites');
var AddingComment = require('../PostJobs/AddCommentsToPostJob');

var PostJobs = {

    postjobs: (params,attachFiles,headers,req,callback) => {
        return InsertPostJobs.insertNewJob(params,attachFiles, headers, req,callback);
    },

    get: (params,callback) => {
        return FetchPostJobs.fetch(params,callback);
    },
    fetchAllJobs: (callback) => {
        return FetchPostJobs.fetchAllJobs(callback);
    },

    update: (params,attachFiles,headers,req,callback) => {
        return UpdatePostJobs.updateJob(params,attachFiles,headers,req,callback);
    },

    browseJobs: (params,callback) => {
        return BrowsePostJobs.browseJob(params,callback);
    },

    deleteJob: (params,callback) => {
        return DeletePostJob.deleteJob(params,callback);
    },

    addJobToFavourite: (params,callback) => {
        return AddJobToFavorite.addToFavourite(params,callback);
    },
    addCommentToPost: (params,callback) => {
        return AddingComment.addComment(params,callback);
    },
    updatePostJobAsFilled: (params,callback) => {
        return UpdatePostJobs.updateJobAsFilled(params,callback);
    }
}

module.exports = PostJobs;