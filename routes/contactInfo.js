const Contact = require("../database/models/contactInfo")

module.exports = (req, res) => {
    Contact.create({
        ...req.body
    })
    res.redirect('/contactus');
}