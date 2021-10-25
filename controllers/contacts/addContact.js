const { Contact } = require('../../models/contact');
const { joiSchema } = require('../../models/contact/contact');

const addContact = async (req, res, next) => {
  try {
    const body = req.body; // тело запроса с параметрвми объекта контакт

    const { error } = joiSchema.validate(body);
    if (error) {
      const err = new Error(error.message);
      err.status = 404;
      throw err;
    }

    const result = await Contact.create(body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
