
const Joi = require('joi');

// Schéma de validation pour les produits dans une commande
const productSchema = Joi.object({
    productId: Joi.string().required().messages({
        'string.base': 'L\'ID du produit doit être une chaîne de caractères.',
        'string.empty': 'L\'ID du produit est obligatoire.',
        'any.required': 'L\'ID du produit est obligatoire.'
    }),
    quantity: Joi.number().integer().min(1).required().messages({
        'number.base': 'La quantité doit être un nombre.',
        'number.min': 'La quantité doit être au moins de 1.',
        'any.required': 'La quantité est obligatoire.'
    })
});

// Schéma de validation pour une commande (Order)
const orderSchema = Joi.object({
    userId: Joi.string().required(),
    products: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),
            quantity: Joi.number().integer().required()
        })
    ).required(),
    totalPrice: Joi.number().required()
});


const validateOrder = (orderData) => {
    return orderSchema.validate(orderData, { abortEarly: false });
};

module.exports = {
    validateOrder,
    productSchema,
    orderSchema
};
