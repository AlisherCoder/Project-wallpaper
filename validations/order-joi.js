import joi from "joi";

const OrderPostValid = joi.object({
   totalPrice: joi.number().positive().required(),
   userId: joi.number().positive().required(),
   products: joi.array().required(),
});

export { OrderPostValid };
