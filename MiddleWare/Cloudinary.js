const { model } = require('mongoose');

const cloudinary = require('cloudinary').v2;

cloudinary.config({

    cloud_name: 'dp9vjsopj', 
    api_key: '143267165723163', 
    api_secret: '6iA6fhWmSGyBHgtf_I_bWF8enDI'

});

module.exports = cloudinary;


