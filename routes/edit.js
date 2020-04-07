const Post = require("../database/models/post");
module.exports = async (req, res) => {
    let post = await Post.findById(req.params.post);
    res.render('edit', { title: post.title, lang: post.language, code: post.code, inputs: post.inputs, post: post._id });
};
