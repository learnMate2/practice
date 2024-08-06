const mongoose = require("mongoose");
const validator = require("validator");

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:[4,"first name must contain 3 characters"]
    },
    lastName:{
        type:String,
        required:true,
        minlength:[3,"last name must contain 3 characters"]
    },
    email:{
        type:String,
        required:true,
        validator:[validator.isEmail,"Please provide valid email"]
    },
    phone:{
        type:String,
        required:true,
        minlength:[11,"phone number must contain 11 digits"],
        maxlength:[11,"phone number must contain 11 digits"]
    },
    message:{
        type:String,
        required:true,
        minlength:[10,"message must contain 10 characters"]
    }
});
const Message = mongoose.model("Message",messageSchema)
module.exports=Message