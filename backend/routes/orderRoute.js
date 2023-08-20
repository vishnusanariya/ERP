const express = require("express");
const router = express.Router();
const {createOrder, allOrders,oneOrder,updateOrder,deleteOrder} = require('../controller/orderController');
const { validateToken } = require("../middleware/authHandler");
router.use(validateToken);

router.route("/").post(createOrder).get(allOrders);
router.route("/:id").delete(deleteOrder).get(oneOrder).put(updateOrder);

module.exports = router;