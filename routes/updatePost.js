const Post = require('../database/models/post')

module.exports = (req, res) => {
    Post.findByIdAndUpdate(req.params.post, {
        ...req.body
    }, (error, post) => {
        if(error){
            res.redirect('/dashboard');
        }
        else{
            res.redirect('/bookmarks')
        }
    })
}