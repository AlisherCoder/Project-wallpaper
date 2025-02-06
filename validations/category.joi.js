import joi from "joi";

const CatPostValid = joi.object({
   name_uz: joi.string().required(),
   name_ru: joi.string().required(),
});

const CatPatchValid = joi.object({
   name_uz: joi.string(),
   name_ru: joi.string(),
});

export { CatPatchValid, CatPostValid };
