const Customers = require('../../app/Models/Customers');
const PostJob = require('../../app/Models/PostJob');
const PostJobComments = require('../../app/Models/PostComments');

var postJobsDBQuries = {
    getUserQueryFromUserId:(userId) => {
        return Customers.findOne({ userId: new RegExp('^' + userId + '$', "i") }).exec()
    },
    newPostJobsInserQuery:(params,postId,images) => {
      
         let category = {
             categoryId: params.categoryId,
             categoryName: params.categoryName
         }
         let mobile = {
             countryCode: params.countryCode,
             phoneNumber: params.phoneNumber
         }
        let posttimeStamp = new Date().getTime().toString();
        console.log('present timestamp..',posttimeStamp);
        let posttimeStamp1 = new Date();
        let postenddate = posttimeStamp1.getTime() + 30 * 86400000;
        console.log('end timestamp..',postenddate);
        let postjobs = new PostJob({
            postId: postId,
            userId: params.userId,
            category:category,
            postTitle: params.postTitle,
            describeTaskInDetails: params.description,
            location: params.location,
            latitude: params.latitude,
            longitude: params.longitude,
            postedDate: posttimeStamp,
            postendDate: postenddate,
            taskDate: params.taskDate,           
            estHoursToCompleteJob: params.estHours,
            startTime: params.startTime,
            budget: params.budget,
            mobile:mobile,
            post_Status: params.post_Status,
            images:images,
            isTotal: params.isTotal
        })
        return postjobs;
    },

    getPostJobQueryFromId: (params) => {
        var query = { 
            $or: [{ 
                userId: { $regex: params.userId, $options: 'i' }}, { 
                    postId: { $regex: params.userId, $options: 'i' } 
                    }] 
                    }
        return PostJob.find(query, {_id: 0, __v: 0}).exec()
    },
    getPostJobQueryFromPostId: (postId) => {
        
        return PostJob.findOne({ postId: new RegExp('^' + postId + '$') }, { _id: 0, __v: 0 }).exec()
    },
    updatePostJobsQueryParams:(params,images) =>{
        return PostJob.updateOne({ postId: new RegExp('^' + params.postId + '$', 'i') }, {
                    
            category:{categoryId:params.categoryId,categoryName:params.categoryName},
            postTitle: params.postTitle,
            describeTaskInDetails: params.description,
            location: params.location,
            latitude: params.latitude,
            longitude: params.longitude,
            taskDate: params.taskDate,
            estHoursToCompleteJob: params.estHours,
            startTime: params.startTime,
            budget: params.budget,
            mobile:{countryCode:params.countryCode,phoneNumber:params.phoneNumber},
            images:images,
            post_Status: params.post_Status,
            isTotal: params.isTotal
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
    getDeletePostJobQuery: (postId) => {
        return PostJob.deleteOne({ postId: new RegExp('^' + postId + '$') }).exec()
    },

    getAddPostToFavouriteQuery: (postId,favourite) => {
        return PostJob.updateOne({ postId: new RegExp(postId, 'i') }, {
            $set: {
                favourite: favourite,
            }
        }).exec()
    },
    getAddCommentToPostJobQuery: (params) => {

        let postcomments = new PostJobComments({
            postId: params.postId,
            comments:[{
                userId: params.userId,
                author: params.author,
                author_email: params.author_email,
                author_comment: params.author_comment,
                comment_date: params.timeStamp,
                comment_date_gmt: params.gmt_timeStamp
            }]
        })
        return postcomments;
    },
    getPostCommentsFromPostId: (postId) => {        
        return PostJobComments.findOne({ postId: new RegExp('^' + postId + '$') }, { _id: 0, __v: 0 }).exec()
    },
    
    getPushCommentsToPostJobQuery: (params) => {
        let comments = {
            userId: params.userId,
            author: params.author,
            author_email: params.author_email,
            author_comment: params.author_comment,
            comment_date: params.timeStamp,
            comment_date_gmt: params.gmt_timeStamp
        }
        return PostJobComments.updateOne(
            { postId: params.postId }, 
            { $push: { comments: comments } }
        );
      
    },
    getAllPostJobsQuery: () => {
        return PostJob.find({}, {_id: 0, __v: 0}).exec()
    },

    getUpdatePostJobAsFilledQuery: (params) => {
        return PostJob.updateOne({ postId: new RegExp(params.postId, 'i') }, {
            $set: {
                filled: params.filled,
            }
        }).exec()
    }
    
    
}

module.exports = postJobsDBQuries;