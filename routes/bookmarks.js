const Post = require("../database/models/post");
module.exports = async(req, res) => {
    let posts = await Post.find({ author: req.session.userId });
    res.render('bookmarks', { posts });
};
