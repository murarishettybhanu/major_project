const User = require('../database/models/User')

module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    console.log(req.body);
    if (error) {
      // console.log(error)
      return res.redirect('signup')
    }
    res.redirect('/')
  })
}