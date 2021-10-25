const { Contact } = require('../../models/contact');

const removeContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      const error = new Error(`Contacts width id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'succcess',
      code: 200,
      message: 'Success delete',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContactById;
