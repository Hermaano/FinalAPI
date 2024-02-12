const User = require("../Model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.send(users);
};

const Register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!(fullName && password && email)) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const encMyPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: encMyPassword,
    });

    user.password = undefined;

    res.status(201).json({
      message: "User created successfully",
      User: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "Email is wrong" });
    }

    const encMyPassword = await bcrypt.compare(password, existingUser.password);

    if (!encMyPassword) {
      return res.status(400).json({ message: "Password is wrong" });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        fullname: existingUser.fullName,
        email: existingUser.email,
      },
      "Nucmaan",
      { expiresIn: 3600 }
    );

    res.cookie("token", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    });

    res.status(200).json({
      message: "User logged in successfully",
      existingUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const homepage = async (req, res) => {
  res.status(200).json({
    userId: req.userId,
    fullname: req.fullname,
    email: req.email,
  });
};

module.exports = {
  getAllUsers,
  Register,
  login,
  logout,
  homepage,
};
