const asyncHandler = require("express-async-handler");
const { Company, Order, Item } = require("../models/itemOrderSchema/orderSchema");


//register the company
const registerCompany = asyncHandler(async (req, res) => {
  const {company_name,address,GST,contact} = await req.body;

  if (!company_name || !address || !GST || !contact) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const company = await Company.findOne({
      where: { company_name:company_name,address:address,GST:GST,contact:contact},
    });
    if (company) {
      return res.status(400).json({ message: "Company already exists" });
    }
    // else if (password != cpassword){
    //   return res.status(400).json({message: "Password does not match with confirm password"})
    // }
    else {
      const company = await Company.create({
        company_name,address,GST,contact
      });
      return res.status(200).json({ message: "Company added successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});


//delete company details
const deleteCompany = asyncHandler(async (req, res) => {
  try {
    const { company_name} = req.query;
    if (!company_name) {
      res.status(400).json({ message: "Please enter company name " });
    } else {
      const company = await Company.destroy({
        where: { company_name:company_name},
      });
      if (company) {
        res.status(200).json({ message: `company: ${company_name} deleted` });
      }
    }
  } catch (error) {
    console.error(error);
  }
});


//update company details
const updateCompany = asyncHandler(async (req, res) => {
  const {company_name} = req.query;
  const {address,GST,contact}=req.body;
  try {
    const company = await Company.findOne({
      where: {company_name:company_name},
    });
    if (company) {
      const updatedCompany = await Company.update(
        { address:address,GST:GST,contact:contact},
        { where: { company_name: company_name } }
      );
      res.status(200).json({ message: `company details updated successfully` });
    }
  } catch (err) {
    console.error(err);
  }
});


//get the one company
const oneCompany=asyncHandler(async(req,res)=>{
    const {company_name}=req.query
    try{
        const company=await Company.findOne({
            where: {company_name:company_name},
          });
    }catch(err){
        console.error(err);
    }
})


//get list of all company 
const allCompany = asyncHandler(async (req, res) => {
  try {
    const companyList = await Company.findAll({include:{model:Order,as:'Orders',include:{
      model:Item,
      as:'Items'
    }}});
    if (companyList) {
      res.status(200).json({message:companyList});
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
  registerCompany,deleteCompany,updateCompany,allCompany,oneCompany
};
