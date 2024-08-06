const express = require("express")
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const app = require("./server");
const cors = require("cors")
const connDb = require("./database/connDb")
const messageRouter = require("./routers/messageRouter")
const {errorHandler} = require("./middlewares/errorHandler")
const userRouter = require("./routers/userRouter")
app.listen(process.env.PORT,()=>{
    console.log(`port is running at ${process.env.PORT}`);
})
app
app.use(cors({
    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))
app.use("/api/v1/message",messageRouter)
app.use("/users",userRouter)
connDb()

app.use(errorHandler)
module.exports=app