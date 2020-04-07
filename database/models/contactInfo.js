
const bcryptjs = require('bcryptjs')
const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    query:{
        type:String
    }

})

module.exports = mongoose.model('Contact', ContactSchema)