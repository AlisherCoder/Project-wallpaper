import joi from "joi";

const CountryPostValid = joi.object({
   name_uz: joi.string().required(),
   name_ru: joi.string().required(),
});

const CountryPatchValid = joi.object({
   name_uz: joi.string(),
   name_ru: joi.string(),
});

export { CountryPatchValid, CountryPostValid };
