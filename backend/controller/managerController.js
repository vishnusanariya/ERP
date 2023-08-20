const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const Manager = require("../models/userSchema/managerSchema");

const registerManager = asyncHandler(async (req, res) => {
  const { name, password, department, phone } = await req.body;

  if (!name || !password || !department || !phone) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const manager = await Manager.findOne({
      where: { name: name, phone: phone, department: department },
    });
    if (manager) {
      return res.status(400).json({ message: "Manager already exists" });
    }
    // else if (password != cpassword){
    //   return res.status(400).json({message: "Password does not match with confirm password"})
    // }
    else {
      const manager = await Manager.create({
        name,
        password,
        department,
        phone,
      });
      return res.status(200).json({ message: "manager added successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});
const loginManager = asyncHandler(async (req, res) => {
  const { name, department, password } = await req.body;
  if (!name || !department || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  } else {
    try {
      const manager = await Manager.findOne({
        where: { name: name, department: department },
      });
      // console.log('manager found successfully:',manager);
      if (!manager) {
        res.status(400).json({ message: "Manager does not exist" });
      } else if (bcrypt.compare(manager.password, password)) {
        const token=jwt.sign({
          user:{
              name: manager.name,
              role:manager.user_role,
              phone:manager.phone,
              id:manager.id
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
const deleteManager = asyncHandler(async (req, res) => {
  try {
    const { name, department } = req.body;
    if (!name || !department) {
      res.status(400).json({ message: "Please enter name and department" });
    } else {
      const manager = await Manager.destroy({
        where: { name: name, department: department },
      });
      if (manager) {
        res.status(200).json({ message: `manager: ${name} deleted` });
      }
    }
  } catch (error) {
    console.error(error);
  }
});
const updateManager = asyncHandler(async (req, res) => {
  const { name, department, phone } = req.body;
  try {
    const manager = await Manager.findOne({
      where: { name: name, department: department, phone: phone },
    });
    if (manager) {
      const updatedManager = await Manager.update(
        { name: name, department: department, phone: phone },
        { where: { id: manager.id } }
      );
      res.status(200).json({ message: `manager updated successfully` });
    }
  } catch (err) {
    console.error(err);
  }
});

const allManager = asyncHandler(async (req, res) => {
  try {
    const managerList = await Manager.findAll();
    if (managerList) {
      res.status(200).json({message:managerList});
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
  registerManager,
  deleteManager,
  loginManager,
  updateManager,
  allManager,
};
