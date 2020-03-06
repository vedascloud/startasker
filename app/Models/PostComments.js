const mongoose = require('mongoose');
let schema = mongoose.Schema;
var CustomerSchema = new schema({
    postId: {
        type: String,
        required: true,
        unique: true
    },
    comments: [{
        userId:{
            type: String,
            required: true
        },
        author:{
            type:String,
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
        }


    }]

});
module.exports = mongoose.model('PostComments',CustomerSchema);