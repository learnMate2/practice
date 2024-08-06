const asyncCatcherror = require("../middlewares/asyncCatcherrors");
const {ErrorHandler} = require("../middlewares/errorHandler");
const User = require("../models/user");
const jwtToken = require("../utils/jwtToken")

//=================user register====================
const registerPatient = asyncCatcherror(async(req,res,next)=>{
    const {firstName,lastName,email,phone,gender,password,role} = req.body;
    if(!firstName||!lastName||!email||!phone||!gender||!password||!role){
        return next(new ErrorHandler("please fill ful8l form",400))
    }
    let user = await User.findOne({email}); 
    if(user){
        return next(new ErrorHandler("user already register",400))
    }
    user =await User.create({firstName,lastName,email,phone,gender,password,role});
    jwtToken(user,"user registered successfully",200,res)
    // res.status(200).json({
    //     success:true,
    //     message:"user registered successfully"
    // })
})

module.exports=registerPatient
//=================user login====================

const login = asyncCatcherror(async(req,res,next) =>{
    const {email,password,confirmPassword,role} = req.body;
    if(!email||!password||!confirmPassword||!role){
        return next(new ErrorHandler("Please provide all detail8s",400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("password or confirm is not matched",400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("invalid email or password ",400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid email or password",400));
    }
    if(role !== user.role){
        return next(new ErrorHandler("user with this role not found",400));
    }
    // jwtToken(user,"Login successfully",200,res)

    res.status(200).json({
        success:true,
        message:"Login successfully"
    })
});

module.exports = login 

//=================trgister Admin====================

// const addNewAdmin = asyncCatcherror(async(req,res,next) =>{
//     const {firstName,lastName,email,phone,gender,password} = req.body;
//     if(!firstName||!lastName||!email||!phone||!gender||!password){
//         return next(new ErrorHandler("Please fill full form",400)); 
//     }
//     const isRegister = await User.findOne({email})
//     if(!isRegister){
//         return next(new ErrorHandler("Admin already register",400)); 

//     }
//     const admin = await User.create({
//         firstName,lastName,email,phone,dob,gender,password,role:"Admin"
//     })
//     res.status(200).json({
//         success:true,
//         message:"Admin Added"
//     })
// })


// module.exports=addNewAdmin