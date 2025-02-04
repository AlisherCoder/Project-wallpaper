import joi from "joi";

const PrdPostValid = joi.object({
   name_uz: joi.string().max(255).min(2).required(),
   name_ru: joi.string().max(255).min(2).required(),
   oldPrice: joi.number().positive().required(),
   description_uz: joi.string().required(),
   description_ru: joi.string().required(),
   washable: joi.boolean().required(),
   size: joi.string().required(),
   inStock: joi.boolean().required(),
   brandsID: joi.number().positive().required(),
   contryID: joi.number().positive().required(),
});

const PrdPatchValid = joi.object({
   name_uz: joi.string().max(255).min(2),
   name_ru: joi.string().max(255).min(2),
   oldPrice: joi.number().positive(),
   description_uz: joi.string(),
   description_ru: joi.string(),
   washable: joi.boolean(),
   size: joi.string(),
   inStock: joi.boolean(),
   brandsID: joi.number().positive(),
   contryID: joi.number().positive(),
});

export { PrdPostValid, PrdPatchValid };
