require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const UserRoute = require("./Router/userRouter");
const postRouter = require("./Router/postRoute");
const path = require("path");

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const PORT = process.env.PORT;
const DBURL = process.env.DBURL;

app.use("/api/user", UserRoute);
app.use("/api/post", postRouter);

mongoose.connect(DBURL).then(() => {
  console.log("DB Is Connected ");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
