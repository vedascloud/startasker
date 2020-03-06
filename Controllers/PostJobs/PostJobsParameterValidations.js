const Joi = require('@hapi/joi');


var newPostJobParamsValidations = {
    validateNewPostJobParamS:(params) => {
      
        const schema = Joi.object({
            userId: Joi.string().required(),
            categoryId: Joi.string().required(),
            categoryName: Joi.string().required(),
            postTitle: Joi.string().required(),
            description: Joi.string().required(),
            location: Joi.string().required().optional().allow(''),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            taskDate: Joi.string().required(),
            estHours: Joi.string().required().optional().allow(''),
            startTime: Joi.string().required().optional().allow(''),
            budget: Joi.number().required(),
            countryCode: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            post_Status: Joi.string().required(),
            isTotal: Joi.boolean().required()
        })
        return schema.validate(params);
    },
    validateFetchJobParams:(params) => {
        const schema = Joi.object({
            userId : Joi.string().required()
        })
        return schema.validate(params);
    },

    validatePostJobsUpdateParams:(params) => {
        const updateSchema = Joi.object({
            postId: Joi.string().required(),
            categoryId: Joi.string().required(),
            categoryName: Joi.string().required(),
            postTitle: Joi.string().required(),
            description: Joi.string().required(),
            location: Joi.string().required().optional().allow(''),
            latitude: Joi.string().required(),
            longitude: Joi.string().required(),
            estHours: Joi.string().required().optional().allow(''),
            startTime: Joi.string().required().optional().allow(''),
            budget: Joi.number().required(),
            countryCode: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            taskDate: Joi.string().required(),
            post_Status: Joi.string().required(),
            isTotal: Joi.boolean().required()
        })
        return updateSchema.validate(params);
    },

    validateBroseJobParams:(params) => {
        const schema = Joi.object({
            keyword : Joi.string().optional().allow(''),
            location : Joi.string().optional().allow(''),
            categories : Joi.array().optional().allow('')
        })
        return schema.validate(params);
    },

    validateDeleteJobParams:(params) =>{
        const schema = Joi.object({
            postId: Joi.string().required()
        })
        return schema.validate(params);
    },
    validateAddToFavouriteJobParams:(params) =>{
        const schema = Joi.object({
            postId: Joi.string().required(),
            favourite: Joi.boolean().required()
        })
        return schema.validate(params);
    },
    validateAddCommentsToPostJobsParams:(params) => {
       
        const schema = Joi.object({
            postId: Joi.string().required(),
            userId: Joi.string().required(),
            author: Joi.string().required(),
            author_comment: Joi.string().required(),
            author_email: Joi.string().required(),
            author_url: Joi.string().optional().allow(''),
            author_ip: Joi.string().optional().allow(''),
            timeStamp: Joi.string().required(),
            gmt_timeStamp: Joi.string().required()


        })
        return schema.validate(params);
    },
    validateUpdateJobAsFilledParams:(params) =>{
        const schema = Joi.object({
            postId: Joi.string().required(),
            filled: Joi.boolean().required()
        })
        return schema.validate(params);
    }
}

module.exports = newPostJobParamsValidations;