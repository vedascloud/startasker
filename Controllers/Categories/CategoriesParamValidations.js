const Joi = require('@hapi/joi');

var categoryValidations = {
    validateinsertParams: (params) => {
        const registerSchema = Joi.object({
            categoryName: Joi.string().required()
        });
        return registerSchema.validate(params);
    },
    validateUpdateParams: (params) => {
        const categoriesInformationSchema = Joi.object({
            categoryName: Joi.string().required(),
            image: Joi.string().optional().allow('')
        });
        return categoriesInformationSchema.validate(params);
    },
   validateDeleteParams:(params) => {
    const schema = Joi.object({
        categoryId: Joi.string().required()
    });
    return schema.validate(params);
}

};

module.exports = categoryValidations;