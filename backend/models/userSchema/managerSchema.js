const { DataTypes } = require('sequelize');
const {sequelize}=require('../../db');
const bcrypt = require('bcryptjs/dist/bcrypt');
const Manager=sequelize.define('Manager',{
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
    department:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
    },
    user_role:{
        type:DataTypes.STRING,
        defaultValue:"manager",
    },
    dateOfJoining:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
},{
    freezeTableName:true,
    timestamps:true,
});

module.exports = Manager;