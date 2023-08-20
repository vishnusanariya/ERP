const express = require('express');
const asyncHandler=require('express-async-handler');
const errorHandler = require('./middleware/errorHandler');
const app = express()
const {connect}=require('./db');
const { validateToken } = require('./middleware/authHandler');
const dotenv = require('dotenv').config();
const port = process.env.PORT ||8082;
connect();
app.use(express.json());
app.use('/api/v1/manager', require('./routes/managerRoute'));
app.use('/api/v1/admin', require('./routes/adminRoute'));
app.use('/api/v1/order', require('./routes/orderRoute'));
app.use('/api/v1/company', require('./routes/companyRoute'));
app.use(errorHandler);
app.get('/api/v1/currentUser',validateToken,asyncHandler(async(req,res)=>{
    console.log('====================================');
    console.log("current user :",req.user);
    console.log('====================================');
    res.status(200).json(req.user);
}))
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
