const FeedBack = require('./ShareFeedBack');
const FetchFeedback = require('./FetchFeedBack');

var feedback = {
    feedback: (params, callback) => {
        return FeedBack.feedback(params, callback);
    },
    fetch: (params,callback) => {
        return FetchFeedback.fetch(params,callback);
    },
};

module.exports = feedback;