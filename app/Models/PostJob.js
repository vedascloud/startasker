const mongoose = require('mongoose');
let schema = mongoose.Schema;
var PostJobSchema = new schema({
    postID: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    userID: {
        type: String,
        required: true
    },
    category: {
        categoryId: {
            type: Number,
            required: false
        },
        categoryName: {
            type: String,
            required: false
        },
        required: false,
        type: Object
    },
    postTitle: {
        type: String,
        required: false
    },
    describeTaskInDetails: {
        type: String,
        required: false
    },
    numberOfWorkers: {
        type: Number,
        required: false,
        default: 1
    },
    canThisTaskRemote: {
        type: Boolean,
        requred: false,
        default: false
    },
    location: {
        type: String,
        required: false
    },
    loc: {
        type: [Number],  // [<longitude>, <latitude>]
        index: '2d',      // create the geospatial index
        required: false
    },
    mustHaves: {
        type: Array,
        requred: false
    },
    postedDate: {
        type: String,
        required: false
    },
    taskDate: {
        type: String,
        required: false
    },
    convenientTimings: {
        type: Array,
        required: false
    },
    postendDate: {
        type: String,
        required: false
    },
    budget: {
        budgetType: {
            Total: {
                type: Boolean,
                required: false,
                default: true
            },
            HourlyRate: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        budget:{
            type:Number,
            required:false,
            default: 0
        },
        Hours: {
            type: String,
            required: false
        },
        pricePerHour: {
            type: Number,
            required: false,
            default: 0
        }
    },
    attachments: [{
        type: String,
        required: false
    }],
    post_Status: {
        type: String,
        required: false
    },
    filled: {
        type: Boolean,
        default: false
    },
    jobAppliedCount: {
        type: Number,
        default: 0
    },
    favourite: {
        type: Boolean,
        default: false,
        required: false
    },
    postModifyDate: {
        type: String,
        required: false
    },
    comments: [{
        author: {
            type: String,
            required: true
        },
        author_email: {
            type: String,
            required: true
        },
        author_comment: {
            type: String,
            required: true
        },
        author_url: {
            type: String,
            required: false
        },
        author_ip: {
            type: String,
            required: false
        },
        comment_date: {
            type: String,
            required: true
        },
        comment_date_gmt: {
            type: String,
            required: true
        },
        type: Object,
        default: []
    }],
    offers: [{
        authorName: {
            type: String,
            required: false
        },
        offeredUserID: {
            type: String,
            required: false
        },
        authorMessages: [{
            message: {
                type: String,
                required: false
            },
            userID: {
                type: String,
                required: false
            },
            timestamp: {
                type: String,
                required: false
            },
        }],
        authorRatings: {
            type: Number,
            required: false
        },
        budget: {
            type: Number,
            required: false
        },
        authorProfilePic: {
            type: String,
            required: false
        },
        type: Object,
        required: false,
        default: []
    }]

});

module.exports = mongoose.model('PostJobs', PostJobSchema);