const Comment = require("../models/comment.model.js");
const Post = require("../models/post.model.js");

module.exports.create = async (req, res) => {
  try {
    const {name, text, postId} = req.body;
    const comment = new Comment({
      name,
      text,
      postId,
    });

    await comment.save();

    const post = await Post.findById(postId);
    post.comments.push(comment._id);

    await post.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};
