const Message = require("../models/message");
const {ErrorHandler} = require("../middlewares/errorHandler")
const asyncCatcherrors = require("../middlewares/asyncCatcherrors")
const sendMessage = asyncCatcherrors(async(req,res,next) => {
    const {firstName,lastName,email,phone,message} = req.body;
    if(!firstName||!lastName||!email||!phone||!message){
        return next(new ErrorHandler("Please fill full form",400))
    }
    await Message.create({firstName,lastName,email,phone,message});
    res.status(200).json({
        success:true,
        message:"successfully submit the form"
    })
})

module.exports = sendMessage