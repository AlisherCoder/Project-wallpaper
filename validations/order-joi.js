import joi from "joi";

const OrderPostValid = joi.object({
   totalPrice: joi.number().positive().required(),
   userId: joi.number().positive().required(),
});

const OrderPatchValid = joi.object({
   totalPrice: joi.number().positive(),
   userId: joi.number().positive(),
});

const OrderItemPostValid = joi.object({
   orderId: joi.number().positive().required(),
   productId: joi.number().positive().required(),
   quantity: joi.number().positive().required(),
   totalSum: joi.number().positive().required(),
});

const OrderItemPatchValid = joi.object({
   orderId: joi.number().positive(),
   productId: joi.number().positive(),
   quantity: joi.number().positive(),
   totalSum: joi.number().positive(),
});

export {
   OrderPatchValid,
   OrderPostValid,
   OrderItemPatchValid,
   OrderItemPostValid,
};
