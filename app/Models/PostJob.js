const mongoose = require('mongoose');
let schema = mongoose.Schema;
var PostJobSchema = new schema({
    postId: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    userId: {
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
        required: true
    },
    describeTaskInDetails: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    latitude: {
        type: String,  
        required: true
    },
    longitude: {
        type: String,  
        required: true
    },
    postedDate: {
        type: String,
        required: true
    },
    taskDate: {
        type: String,
        required: true
    },
    postendDate: {
        type: String
    },
    estHoursToCompleteJob: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    images: [{
        type: String,
        required: false
    }],
    mobile: {
        countryCode: {
            required: true,
            type: String
        },
        phoneNumber: {
            required: true,
            type: String
        }
    },
    post_Status: {
        type: String,
        required: true
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
    isTotal: {
        type: Boolean,
        required: false,
        default: true
    }

});

module.exports = mongoose.model('PostJobs', PostJobSchema);