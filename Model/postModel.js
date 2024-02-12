const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postType : {
    type: String,
    required: true,
  },

  image : {
    type: String,
    required: true
  },
  
  email : {
    type: String,
    required: true
  }
 

});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
