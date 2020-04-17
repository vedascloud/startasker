const mongoose = require('mongoose');
let schema = mongoose.Schema;
var CouponSchema = new schema({
    couponID: {
        required: true,
        type: String,
        unique: true
    },
    couponCode: {
            type: String,
            required: true
        },
    expiryData : {
            type: String,
            required: true
        },
    timestamp: {
        type: String,
        required: true
    }

});
module.exports = mongoose.model('Coupon',CouponSchema   );