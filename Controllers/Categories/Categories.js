const Categories = require('./FetchingCategories');

var fetchCategoriesList = {

    fetch: (callback) =>{
        return Categories.fetch(callback);
    }
}

module.exports = fetchCategoriesList;