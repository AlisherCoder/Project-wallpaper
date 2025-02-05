import Joi from "joi";

function categoryItemsValidation(data) {
    const categoryItems = Joi.object({
        categoryID : Joi.number().positive(),
        productID : Joi.number().positive()

    })
    return categoryItems.validate(data, {abortEarly: true});
};

export default categoryItemsValidation;