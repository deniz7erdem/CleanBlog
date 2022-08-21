const Post = require('../models/Post');

exports.getPosts=async (req, res) => {
    const posts = await Post.find({});
    res.render('index',{
        posts
    });
};

exports.getPost= async (req, res) => {
    const post = await Post.findById(req.params.id);

    res.render('post', { post });
};

exports.putPost=async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    post.title = req.body.title;
    post.detail = req.body.detail;
    post.save();
    res.redirect(`/post/${req.params.id}`)
};

exports.postPost=async (req, res) => {
    await Post.create(req.body);
    res.redirect('/');
}

exports.editPost=async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    res.render('edit', {
        post
    });
};

exports.delPost=async (req, res) => {
    await Post.findByIdAndRemove(req.params.id);
    res.redirect('/');
};