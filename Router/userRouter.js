const express = require("express");

const { verifyUser } = require("../MiddleWare/verfication");
const {
  getAllUsers,
  Register,
  login,
  logout,
  homepage
} = require("../Controller/userController"); 

const Router = express.Router();
Router.get("/AllUsers", getAllUsers);
Router.post("/Register", Register);
Router.post("/login", login);
Router.get("/logout", logout);
Router.get("/Home", verifyUser,homepage);


module.exports = Router;
