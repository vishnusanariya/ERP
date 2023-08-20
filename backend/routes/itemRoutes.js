const express = require("express");
const { oneItem, allItems, updateItem, deleteItem } = require("../controller/itemController");
const { authAdmin } = require("../middleware/authHandler");
const router = express.Router();
router.use(authAdmin)
router.route('/').get(allItems);
router.route('/:id').get(oneItem).put(updateItem).delete(deleteItem);

module.exports = router;