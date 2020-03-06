const dbQueries =  require('./CategoriesDBQueries');
const statusCodes = require('../Core/StatusCodes');
var FetchCategories = {
   
    fetch: (callback) => {
        let getQuery = dbQueries.getCategoriesQuery();
        getQuery.then((find) =>{
            callback({ status: 200, 
                data: { 
                    response: statusCodes.success, 
                    message: "Categories fetched successfully" ,
                    categoriesList: find
                } });
            return;
        })
    }

}

module.exports = FetchCategories