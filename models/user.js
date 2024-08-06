const mongoose = require("mongoose");
const validator= require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const Schema = mongoose.Schema;

const userSchema= new Schema({
    firstName:{
        type:String,
        required:true,
        minlength:[3,"first name is contain atleast 3"]
    },
    lastName:{
        type:String,
        required:true,
        minlength:[3,"first name is contain atleast 3"]
    },
    email:{
        type:String,
        required:true,
        validator:[validator.isEmail,"Please enter the correct email"]
    },
    phone:{
        type:String,
        required:true,
        minlength:[11,"phone number must contain 11 digits"],
        maxlength:[11,"phone number must contain 11 digits"]
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    password:{
        type:String,
        required:true,
        minlength:[8,"password must contain 8 characters"],
        select:false
    },
    role:{
        type:String,
        enum:["Patient","Admin","Doctor"],
        required:true
    },
    docDepartment:{
        type:String
    },
    docAvator:{
        url:String,
        public_id:String
    }
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
this.password = await bcrypt.hash(this.password,10);
})
userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
}

userSchema.methods.generateJwt = function(){
    return jwt.sign(({id:this._id}),process.env.JWT_SEARCT_KEY,{
        expiresIn:process.env.JWT_EXPIRES
    })
}


const User = mongoose.model("User",userSchema);
module.exports= User;