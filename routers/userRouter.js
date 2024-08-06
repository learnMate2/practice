const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController")
const login = require("../controllers/userController")
// const addNewAdmin = require("../controllers/userController")
router.post("/register",userController)
router.post("/login",login)
// router.post("/admin/addnew",addNewAdmin)

module.exports=router; 