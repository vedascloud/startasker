const Categories = require('../../app/Models/Categories');

var CategoriesList = {

    getCategoriesQuery: () => {
        return Categories.find({}, {_id: 0, __v: 0}).exec()
    },
    getCategoryQuery: (params) => {
        var query = {
            $or: [{
                categoryId: {$regex: '^' + params.categoryId + '$', $options: 'i'}
            },
                {
                    categoryName: {$regex: '^' + params.categoryName + '$', $options: 'i'}
                }]
        }
        return Categories.findOne(query, {_id: 0, __v: 0}).exec()

    },
    categoryInsertQuery:(params,categoryid,filePath) => {
        let category = new Categories({
            categoryId:categoryid,
            categoryName: params.categoryName,
            image: filePath
        });
        return category;
    },
    categoryUpdateQuery:(params,imageName) => {

        return Categories.updateOne({categoryName: new RegExp(params.categoryName, 'i')},
            {
                $set: {
                    image: imageName
                }
            }).exec()
    },

    categoryDeleteQuery:(categoryId)=>{
        return Categories.deleteOne({ categoryId: new RegExp('^' +categoryId + '$') }).exec()

    }
};

module.exports = CategoriesList;