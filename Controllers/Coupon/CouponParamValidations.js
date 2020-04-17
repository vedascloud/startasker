const Joi = require('@hapi/joi');

var couponValidations = {
    validateinsertParams: (params) => {
        const registerSchema = Joi.object({
            couponID: Joi.string().required(),
            couponCode : Joi.string().required(),
            expiryData : Joi.string().required()
        });
        return registerSchema.validate(params);
    },
    validateupdateParams:(params) =>{
        const updateSchema = Joi.object({
            couponID: Joi.string().required(),
            couponCode: Joi.string().required()
        })
        return updateSchema.validate(params);
    },
    validateDeleteParams:(params) => {
        const schema = Joi.object({
            couponID: Joi.string().required()
        });
        return schema.validate(params);
    },
};
module.exports = couponValidations;