const Contact = require('../database/models/contactInfo')

module.exports = async (req, res) => {
  const messages = await Contact.find({}).sort({_id:-1});

  res.render("allmessages", {
    messages
  });
}