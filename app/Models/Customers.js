const mongoose = require('mongoose');
const db = require('./DBConnection');
let schema = mongoose.Schema;
var CustomerSchema = new schema({

    userID: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    postTask: {
        type: Boolean,
        required: false,
        default: false
    },
    completeTask: {
        type: Boolean,
        required: false,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    countryCode: {
        required: false,
        type: String
    },
    phoneNumber: {
        required: false,
        type: String
    },
    otp: {
        type: String,
        required: true
    },
    otp_time: {
        type: String,
        required: false
    },
    dob: {
        type: String,
        required: false
    },
    verification_status: {
        type: Boolean,
        default: false,
        required: true
    },
    loc: {
        type: [Number],  // [<longitude>, <latitude>]
        index: '2d',      // create the geospatial index
        required: false
    },
    register_time: {
        type: String,
        required: true
    },
    register_type: {
        type: String,
        required: true
    },
    login_type: {
        type: String,
        required: false
    },
    prefer_language: {
        type: String,
        required: true,
        default: 'English'
    },
    profilePic: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    apt: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    zipCode: {
        type: Number,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    region: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    login_status: {
        type: Boolean,
        default: false
    },
    Facebook: {
        facebookID: {
            type: String,
            required: false
          
        },
        tokenId: {
            type: String,
            required: false
        }

    },
    Google: {
        GoogleID: {
            type: String,
            required: false
        },
        tokenId: {
            type: String,
            required: false
        }
    },
    isProfileUpdate:{
        type: Boolean,
        required: true,
        default: false
    }

});
db.connectToDB();
module.exports = mongoose.model('Customers', CustomerSchema);