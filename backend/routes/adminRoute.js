const express = require("express");
const router = express.Router();
const {registerAdmin,loginAdmin}=require('../controller/adminController');

//to create the admin
router.post("/register",registerAdmin);

//to login the admin
router.post("/login",loginAdmin);


module.exports = router;
