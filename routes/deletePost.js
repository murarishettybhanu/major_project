const Post = require("../database/models/post");
module.exports = async (req, res) => {
    await Post.findByIdAndDelete(req.params.post, (error, done) => {
        if (done) {
            res.redirect('/bookmarks');
        }
        else {
            res.redirect('/');
        }
    });
};
