import joi from "joi";

const BrandPostValid = joi.object({
   name_uz: joi.string().required(),
   name_ru: joi.string().required(),
});

const BrandPatchValid = joi.object({
   name_uz: joi.string(),
   name_ru: joi.string(),
});

export { BrandPatchValid, BrandPostValid };
