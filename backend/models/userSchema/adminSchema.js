const { DataTypes } = require('sequelize');
const {sequelize}=require('../../db');
const bcrypt = require('bcryptjs/dist/bcrypt');
const Admin=sequelize.define('Admin',{
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        set(value) {
            const hash = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hash);
          },
    },
    phone:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
    },
    user_role:{
        type:DataTypes.STRING,
        defaultValue:"admin",
    },
},{
    freezeTableName:true,
    timestamps:true,
});

module.exports = Admin;