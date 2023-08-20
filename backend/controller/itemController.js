const asyncHandler = require("express-async-handler");
const { Item } = require("../models/itemOrderSchema/orderSchema");

const allItems = asyncHandler(async (req, res) => {
  let { departement } = req.body;
  const itemsList = await Item.findAll({
    where: {
      currentDepartement: departement,
    },
  });
  if (itemsList) {
    res.status(200).json({ items: itemsList });
  }
});
const oneItem = asyncHandler(async (req, res) => {
  const { itemname } = req.query;
  const item = await Item.findAll({ where: { itemname: itemname } });
  if (item) {
    res.status(200).json({ item: item });
  }
});

const updateItem = asyncHandler(async (req, res) => {
  const { itemname, currentDepartement, quantity, metal, status } = req.body;
  const item = await Item.find({
    where: {
      itemname: itemname,
      currentDepartement: currentDepartement,
      quantity: quantity,
      metal: metal,
      status: status,
    },
  });
  if (item) {
    const updatedItem = await Item.update(
      {
        quantity: quantity,
        metal: metal,
        status: status,
        currentDepartement: currentDepartement,
      },
      {
        where: { id: item.id },
      }
    );
    if (updatedItem) {
      res.status(200).json(`${updatedItem} updated successfully`);
    } else {
      throw new Error(`${item} is not updated`);
    }
  } else {
    throw new Error(`${item} not exist`);
  }
});

const deleteItem = asyncHandler(async (req, res) => {
  const { itemname } = req.body;
  const item = await Item.destroy({
    where: { itemname: itemname, currentDepartement: currentDepartement },
  });
  if (item) {
    res.status(200).json("deleted successfully");
  } else {
    res.status(404).json("Item not exist");
  }
});
module.exports = { oneItem, allItems, deleteItem, updateItem };
