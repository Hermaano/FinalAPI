const express = require("express");

const {
  getAllPosts,
  getSinglePost,
  createPost,
  deleteSinglePost,
  updatePost,
} = require("../Controller/postController");

const upload = require("../MiddleWare/multerMd");

const Router = express.Router();

Router.get("/getAllPosts", getAllPosts);
Router.get("/getSinglePost/:id", getSinglePost);
Router.delete("/deleteSinglePost/:id", deleteSinglePost);
Router.put("/updatePost/:id", upload.single('file'), updatePost);
Router.post("/createPost",upload.single('file'),createPost);

module.exports = Router;

//upload.single("file"),
