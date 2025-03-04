import Joi from 'joi';



export const createAddressSchema = Joi.object({
    userId: Joi.number().required(),  
    address: Joi.string().required(),  
});
 

export const updateAddressSchema = Joi.object({  
    address: Joi.string().required(),  
});
 