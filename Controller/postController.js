const Post = require("../Model/postModel");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({
      message: "Success! This is a JSON response. with All posts",
      posts,
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error! Something went wrong on the server.' });
  }
};

const getSinglePost = async (req, res) => {
  try {
       const { id } = req.params;

       const post = await Post.findById(id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }
       res.status(200).json({
         message: "Success! This is a JSON response. with Single post",
         post,
       });

   } catch (error) {
    res.status(500).json({ error: 'Server error! Something went wrong on the server.' });
  }
};

const createPost = async (req, res) => {
  try {
    const {title, description, postType, user} = req.body;

     console.log(req.file);

     // filename

    if(!(title && description && postType)) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }


    const post = await Post.create({
      title,
      description,
      postType,
      image: req.file.filename,
      email : user
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  
  } catch (error) {
    res.status(500).json({ error: 'Server error! Something went wrong on the server.' });
  }
};

const deleteSinglePost = async (req, res) => {
 try {

  const { id } = req.params;

  const post = await Post.findByIdAndDelete(id);

  if (!post) {
    res.status(404).json({ message: "Post not found" });
  }

  res.status(200).json({
    message: "Post deleted successfully",
    post,
  });
  
 } catch (error) {
  res.status(500).json({ error: 'Server error! Something went wrong on the server.' });
 }
};

const updatePost = async (req, res) => {
  try {

    console.log(req.file);
   
    const { id } = req.params;

    const { title, description, postType } = req.body;

    if(!(title && description && postType)) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const post = await Post.findByIdAndUpdate(id, {
      title,
      description,
      postType,
      image: req.file.filename,
    });

    res.status(200).json({
      message: "Post updated successfully",
      post,
    });


  } catch (error) {
    res.status(500).json({ error: 'Server error! Something went wrong on the server.' });
  }
};

module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  deleteSinglePost,
  updatePost,
};
