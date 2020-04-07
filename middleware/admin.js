const User = require('../database/models/User')

module.exports = (req, res, next) => {
  // fetch user from database
  User.findById(req.session.userId, (error, user) => {
    if (user.email === "admin@ocr.com") {
      next()
    }
    else{
      res.redirect('/')
    }
  })

}