const dbQueries =  require('./FeedBackDBQueries');
const statusCodes = require('../Core/StatusCodes');
var FetchFeedBack = {

    fetch: (callback) => {
        let getQuery = dbQueries.FetchQuery();
        getQuery.then((find) =>{
            callback({ status: 200,
                data: {
                    response: statusCodes.success,
                    message: "FeedBack fetched successfully" ,
                    FeedBack: find
                } });
            return;
        })
    }

}

module.exports = FetchFeedBack;