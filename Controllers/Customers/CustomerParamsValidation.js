const Joi = require('@hapi/joi');

var customerValidations = {
    validateParams:(params) => {
       
        const customerInformationSchema = Joi.object({          
            userID: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().min(8).required(),
            register_type: Joi.string().required(),
            register_time: Joi.string().required()
           
        });
        return customerInformationSchema.validate(params);
    },
    validateVerifyParams:(params)=>{
        let schema = Joi.object({
             userID: Joi.string().email({ minDomainSegments: 2 }).required(),
             otp: Joi.string().required()
         });
         return schema.validate(params)
     },    
     validateLoginParams:(params)=>{
        let schema = Joi.object({
             userID: Joi.string().email({ minDomainSegments: 2 }).required(),
             password: Joi.string().min(8).required()
         });
         return schema.validate(params)
     },
     validateForgotPasswordParams:(params)=>{
        let schema = Joi.object({
             userID: Joi.string().email({ minDomainSegments: 2 }).required()       
         });
         return schema.validate(params)
     },
     
     validateUpdateParams:(params) => {
       
        const customerInformationSchema = Joi.object({
            userID: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            latitude: Joi.string().required(),
            longitude: Joi.string().required(),
            postTask: Joi.string().required(),
            completeTask: Joi.string().required(),
            address: Joi.string().required(),
            phoneNumber: Joi.string().required()
        });
        return customerInformationSchema.validate(params);
    },
    validateSocial_MediaLoginParams:(params) => {
       
        const customerInformationSchema = Joi.object({
            ID: Joi.string().required(),
            tokenID: Joi.string().required(),
            userID: Joi.string().email({ minDomainSegments: 2 }).optional().allow(''),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            profilePic: Joi.string().optional().allow(''),
            register_type: Joi.string().required()
           
        });
        return customerInformationSchema.validate(params);
    }
}

module.exports = customerValidations;