const asyncHandler = require("express-async-handler");
const {
  Order,
  Item,
  Company,
} = require("../models/itemOrderSchema/orderSchema");
// const Item = require("../models/itemOrderSchema/itemSchema");

//create a new Order and associate it with its items
const createOrder = asyncHandler(async (req, res) => {
  const { company_name, order_no, expected_dispatch_date, items } = req.body;
  if (!order_no || !expected_dispatch_date || !items || !company_name) {
    res.status(400).json({ message: "please provide all fields" });
  }
  try {
    const order = await Order.findOne({
      where: {
        order_no: order_no,
        expected_dispatch_date: expected_dispatch_date,
      },
    });
    if (order) {
      return res.status(400).json({ message: "order already exists" });
    } else {
      const company = await Company.findByPk(company_name);
      if(company) {
        const order = await Order.create({
          order_no,
          expected_dispatch_date,
          company_name: company_name
        });
        const ItemList = await Promise.all(
          items.map((item) => {
            Item.create({ ...item, order_no: order.order_no });
          })
        );
        return res
          .status(200)
          .json({ message: `order added successfully:${order}\n ${ItemList}` });
      }
      else{
        res.status(400).json({ message: `Company : ${company_name} not found` });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// get all order and associated items
const allOrders = asyncHandler(async (req, res) => {
  const order_list = await Order.findAll({
    include: Item,
  });
  res.status(200).json(order_list);
});

//get particular order and its items
const oneOrder = asyncHandler(async (req, res) => {
  let { order_id } = req.query;
  const order = await Order.find({
    where: {
      id: order_id,
      include: Item,
    },
  });
  res.status(200).json(order);
});

//update order

const updateOrder = asyncHandler(async (req, res) => {
  const order_id = req.params.order_id;
  const { expected_dispatch_date } = req.body;

  const order = await Order.findByPk(order_id);

  order.expected_dispatch_date = expected_dispatch_date;
  order.save();
  res.status(200).json(order);
});

// delete one order
const deleteOrder = asyncHandler(async (req, res) => {
  const order_id = req.params.order_id;
  const order = await Order.findByPk(order_id);
  order.destroy();
  res
    .status(200)
    .json({ message: `Order with id: ${order_id}  deleted successfully` });
});
module.exports = { createOrder, allOrders, deleteOrder, updateOrder, oneOrder };
