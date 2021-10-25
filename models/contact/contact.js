const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema(
  {
    name: {
      type: String,
      require: [true, 'Имя контакта обязтельно'],
    },
    email: {
      type: String,
      require: [true, 'Email обязательно'],
    },
    phone: {
      type: String,
      require: [true, 'Номер телефона обязательно'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamp: true },
);

const joiSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .regex(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .required(),
  favorite: Joi.boolean(),
});

const updadeFavoriteJoiShema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model('contact', contactSchema);

module.exports = {
  joiSchema,
  Contact,
  updadeFavoriteJoiShema,
};
