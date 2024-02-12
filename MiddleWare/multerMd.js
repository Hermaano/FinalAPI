const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    const destinationPath = path.join(__dirname, '../public/images');
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    
    cb(null, file.fieldname + "_"+Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports = upload;


/// her is correct one
