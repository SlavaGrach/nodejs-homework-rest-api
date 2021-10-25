const { Contact } = require('../../models/contact');
const { updadeFavoriteJoiShema } = require('../../models/contact/contact');

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body; // тело запроса с параметрвми объекта контакт
    const { favorite } = body;

    const { error } = updadeFavoriteJoiShema.validate(body);
    if (error) {
      // const err = new Error(error.message);
      const err = new Error('missing field favorite');

      err.status = 400;
      throw err;
    }

    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      },
    );

    if (!result) {
      const error = new Error(`not found`);
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

module.exports = updateStatusContact;
