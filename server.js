const express = require("express");
const {config} = require("dotenv");
const app=express();
const cloudinary = require("cloudinary");
config({path :"./config/config.env"})


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SEARCT_KEY
})
module.exports=app