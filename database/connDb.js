const mongoose =require("mongoose");

const connDb = () =>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"HOSPITAL_MANAGEMENT_SYSTEM"
    }).then(()=>{
        console.log("connected to database");
    }).catch((error)=>{console.log(`error to connect to db ${error}`)})
}
module.exports=connDb