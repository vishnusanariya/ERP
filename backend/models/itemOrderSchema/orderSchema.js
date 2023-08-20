const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db");
const Order = sequelize.define(
  "Order",
  {
    order_no: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    expected_dispatch_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
const Item = sequelize.define(
  "Item",
  {
    itemname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentDepartment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "done", "in-progress"],
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    metal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

const Company = sequelize.define(
  "Company",
  {
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    GST: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

// const Department=sequelize.define('Department',{
//   name: {
//     type:DataTypes.STRING,
//     allowNull:false
//   }
// });
Company.hasMany(Order, {
  foreignKey: "company_name",
  sourceKey: "company_name",
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});
Order.belongsTo(Company, {
  foreignKey: "company_name",
  targetKey: "company_name",
});

Order.hasMany(Item, {
  foreignKey: "order_no",
  sourceKey: "order_no",
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});
Item.belongsTo(Order, { foreignKey: "order_no", targetKey: "order_no" });

// Department.hasMany(Order,{foreignKey:"company_name",sourceKey:"company_name",onDelete:'NO ACTION',onUpdate:'CASCADE'});
// Order.belongsToMany(Department,{foreignKey:"order_no",sourceKey:"order_no",onDelete:'NO ACTION',onUpdate:'CASCADE'});

module.exports = { Order, Item, Company };
