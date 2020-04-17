const Customers = require('../../app/Models/Customers');
const PostJob = require('../../app/Models/PostJob');
var postJobsDBQuries = {
    getUserQueryFromUserId:(userID) => {
        return Customers.findOne({ userID: new RegExp('^' + userID + '$', "i") }).exec()
    },
    newPostJobsInserQuery:(params,postID,images) => {
      
         let budgetType = {
             Total: params.budgetType.Total,
             HourlyRate: params.budgetType.HourlyRate
         }
         let budget = {
             budgetType:budgetType,
             budget:params.budget,
             Hours: params.Hours,
             pricePerHour: params.pricePerHour
         }
         let category = {
            categoryId: params.category.categoryId,
            categoryName: params.category.categoryName
        }
        let posttimeStamp = new Date().getTime().toString();
        let posttimeStamp1 = new Date();
        let postenddate = posttimeStamp1.getTime() + 30 * 86400000;
        let postjobs = new PostJob({
            postID: postID,
            userID: params.userID,
            category:category,
            budget:budget,
            postTitle: params.postTitle,
            describeTaskInDetails: params.describeTaskInDetails,
            numberOfWorkers: params.numberOfWorkers,
            canThisTaskRemote: params.canThisTaskRemote,            
            location: params.location,
            loc:[params.latitude,params.longitude],
            mustHaves: params.mustHaves,
            postedDate: posttimeStamp,
            postendDate: postenddate,
            taskDate: params.taskDate,           
            convenientTimings: params.convenientTimings,                   
            post_Status: params.post_Status,
            attachments:images
        })
        return postjobs;
    },

    getPostJobQueryFromId: (params) => {
        var query = { 
            $or: [{ 
                userID: { $regex: params.userID, $options: 'i' }}, { 
                    postID: { $regex: params.userID, $options: 'i' } 
                    }] 
                    }
        return PostJob.find(query, {_id: 0, __v: 0}).exec()
    },
    getPostJobQueryFromPostId: (postId) => {
        
        return PostJob.findOne({ postID: new RegExp('^' + postId + '$') }, { _id: 0, __v: 0 }).exec()
    },
    updatePostJobsQueryParams:(params,images) =>{
        
        let budgetType = {
            Total: params.budgetType.Total,
            HourlyRate: params.budgetType.HourlyRate
        }
        let budget = {
            budgetType:budgetType,
            budget:params.budget,
            Hours: params.Hours,
            pricePerHour: params.pricePerHour
        }
        let category = {
            categoryId: params.category.categoryId,
            categoryName: params.category.categoryName
        }
        let postModifyTimeStamp = new Date().getTime().toString();
        return PostJob.updateOne({ postID: new RegExp('^' + params.postID + '$', 'i') }, {
           
            budget:budget,
            category:category,
            postTitle: params.postTitle,
            describeTaskInDetails: params.describeTaskInDetails,
            numberOfWorkers: params.numberOfWorkers,
            canThisTaskRemote: params.canThisTaskRemote,            
            location: params.location,
            loc:[params.latitude,params.longitude],
            mustHaves: params.mustHaves,           
            taskDate: params.taskDate,           
            convenientTimings: params.convenientTimings,                     
            post_Status: params.post_Status,
            attachments:images,
            postModifyDate:postModifyTimeStamp
        })       

    },
    //browse job function starts from here...
    getBrowseJobQueryFromName: (params) => {       
        var query = {            
            $and: [{ 
                postTitle: { $regex: params.keyword, $options: 'i' }}, { 
                    location: { $regex: params.location, $options: 'i' }},{ 
                        "category.categoryId":  { $in: params.categories } 
                        }] 
                    }
        return PostJob.find(query, {_id: 0, __v: 0}).exec()
    },
    getBrowseJobQueryFromCategory: (params) => { 
              
        var query = {            
            $and: [{"category.categoryId":  { $in: params.categories } }] 
                    }
        
                return PostJob.find(query, {_id: 0, __v: 0}).exec()
         
    },
    getBrowseJobQueryFromLocation: (params) => {       
        var query = {
            $and: [ { location: { $regex: params.location, $options: 'i' }}] 
                    }
        return PostJob.find(query, {_id: 0, __v: 0}).exec()
    },
    getBrowseJobQueryFromKeyword: (params) => {       
        var query = {
            $and: [ { postTitle: { $regex: params.keyword, $options: 'i' }}] 
                    }
        return PostJob.find(query, {_id: 0, __v: 0}).exec()
    },
   //ends here
    getDeletePostJobQuery: (postID) => {
        return PostJob.updateOne({ postID: new RegExp(postID, 'i') }, {
            $set: {
                post_Status: 'cancel',
            }
        }).exec()
    },

    getAddPostToFavouriteQuery: (postID,favourite) => {
        return PostJob.updateOne({ postID: new RegExp(postID, 'i') }, {
            $set: {
                favourite: favourite,
            }
        }).exec()
    },
    getPushCommentsToPostJobQuery: (params) => {
        let comments = {
            author: params.author,
            author_email: params.author_email,
            author_comment: params.author_comment,
            comment_date: params.timeStamp,
            comment_date_gmt: params.gmt_timeStamp
        }
        return PostJob.updateOne(
            { postID: params.postID }, 
            { $push: { comments: comments } }
        );
      
    },

    getOfferQuery:(params,ratings) => {
        let TimeStamp = new Date().getTime().toString();
        let authorMessages =[{
            userID :params.offeredUserID,
            timestamp:TimeStamp,
            message: params.message
        }]
        let offers = {
            authorRatings:ratings,
            offeredUserID:params.offeredUserID,
            authorProfilePic:params.authorProfilePic,
            authorMessages:authorMessages,
            authorName:params.authorName,
            budget:params.budget
        }
        return PostJob.updateOne(
            { postID: params.postID },
            { $push: { offers: offers } }
        );
    },
    getUpdateJobAppliedCount: (params,count) => {
        return PostJob.updateOne({ postID: new RegExp(params.postID, 'i') }, {
            $set: {
                jobAppliedCount: count
            }
        }).exec()
    },
    getAllPostJobsQuery: () => {
        return PostJob.find({}, {_id: 0, __v: 0}).exec()
    },

    getUpdatePostJobAsFilledQuery: (params) => {
        return PostJob.updateOne({ postID: new RegExp(params.postID, 'i') }, {
            $set: {
                filled: params.filled
            }
        }).exec()
    }
    
}

module.exports = postJobsDBQuries;