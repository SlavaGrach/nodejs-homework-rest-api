const { Contact } = require('../../models/contact');

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({});
    res.json({
      status: 'sucsess',
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
