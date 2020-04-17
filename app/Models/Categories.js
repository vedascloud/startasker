const mongoose = require('mongoose');
let schema = mongoose.Schema;
var CategorySchema = new schema({

    categoryId: {
        required: true,
        type: String,
        unique: true
    },
    categoryName: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false
    }

});
module.exports = mongoose.model('Categories',CategorySchema);