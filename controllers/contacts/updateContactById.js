const { Contact } = require('../../models/contact');
const { joiSchema } = require('../../models/contact/contact');

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body; // тело запроса с параметрвми объекта контакт

    const { error } = joiSchema.validate(body);
    if (error) {
      const err = new Error(error.message);
      err.status = 404;
      throw err;
    }

    const result = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });

    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }

    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactById;
