import joi from "joi";

const CatItemPostValid = joi.object({
   categoryID: joi.number().positive().required(),
   productID: joi.number().positive().required(),
});

const CatItemPatchValid = joi.object({
   categoryID: joi.number().positive(),
   productID: joi.number().positive(),
});

export { CatItemPatchValid, CatItemPostValid };
