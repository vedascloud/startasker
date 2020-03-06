const Categories = require('../../app/Models/Categories');

var fetchCategories = {

    getCategoriesQuery: () => {
        return Categories.find({}, {_id: 0, __v: 0}).exec()
    }
}

module.exports = fetchCategories;