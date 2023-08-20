const {Sequelize,DataTypes}=require('sequelize');
const dotenv = require('dotenv').config();
const sequelize=new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
  dialect: 'mysql',
  dialectOptions: {
    host:'localhost',
    port: process.env.DB_PORT
  }
});
const connect=async()=>{
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      await sequelize.sync();
      console.log("Table creation done successfully");
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}
module.exports={connect,sequelize};
