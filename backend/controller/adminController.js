const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const Admin=require('../models/userSchema/adminSchema');

const registerAdmin = asyncHandler(async (req, res) => {
    const { name, password, phone } = await req.body;
  
    if (!name || !password || !phone) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
  
    try {
      const admin = await Admin.findOne({
        where: { name: name, phone: phone},
      });
      if (admin) {
        return res.status(400).json({ message: "Admin already exists" });
      }
      // else if (password != cpassword){
      //   return res.status(400).json({message: "Password does not match with confirm password"})
      // }
      else {
        const admin = await Admin.create({
          name,
          password,
          phone,
        });
        return res.status(200).json({ message: "admin added successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  });

const loginAdmin = asyncHandler(async (req, res) => {
    const { name,password } = await req.body;
    if (!name ||!password) {
      return res.status(400).json({ message: "Please fill all fields" });
    } else {
      try {
        const admin = await Admin.findOne({
          where: { name: name },
        });
        // console.log('admin found successfully:',admin);
        if (!admin) {
          res.status(400).json({ message: "Admin does not exist" });
        } else if (bcrypt.compare(admin.password, password)) {
          const token=jwt.sign({
            user:{
                name: admin.name,
                role:admin.user_role,
                phone:admin.phone,
                id:admin.id
            }
        },process.env.SECRET_KEY,{
            expiresIn:process.env.TOKEN_EXPIRY,
        });
        res.status(200).json({token});
        } else {
          res.status(400).json({ message: "invalid password" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  });

module.exports={registerAdmin,loginAdmin};