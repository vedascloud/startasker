const mongoose = require('mongoose');
let schema = mongoose.Schema;
var CategorySchema = new schema({

    categoryId: {
        type: String,
        required: true,
        unique: true
    },
    categoryName: {
        type: String,
        required: true
    }

});
module.exports = mongoose.model('Categories',CategorySchema);