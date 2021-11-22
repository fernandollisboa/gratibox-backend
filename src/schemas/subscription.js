import joi from 'joi';

const subscriptionSchema = joi.object({
  userID: joi.number().min(1).required(),
  cep: joi
    .string()
    .alphanum()
    .min(8)
    .max(8)
    .pattern(/[0-9]{8}/)
    .required(),
  city: joi.string().required(),
  address: joi.string().required(),
  type: joi.string().required().min(5).max(5),
  products: joi.array().required(),
  state: joi.string().min(2).max(2).required(),
  name: joi.string().min(1).required(),
  deliveryRateId: joi.number().min(0).max(5).required(),
});

export default subscriptionSchema;
