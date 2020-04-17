const Categories = require('./FetchingCategories');
const CategoriesInsert = require('./InsertCategories') ;
const CategoriesUpdate =require('./UpdateCategories');
const CategoriesDelete = require('./DeleteCategories');
var fetchCategoriesList = {

    fetch: (callback) =>{
        return Categories.fetch(callback);
    },
    insert: (params, file, headers, req, callback) =>{
        return CategoriesInsert.file(params, file, headers, req, callback);
    },
    update: (params, file, headers, req, callback) =>{
        return CategoriesUpdate.update(params, file, headers, req, callback);
    },
    delete: (params, callback) =>{
        return CategoriesDelete.delete(params, callback);
    }
}

module.exports = fetchCategoriesList;