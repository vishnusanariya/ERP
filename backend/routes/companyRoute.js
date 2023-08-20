const express = require("express");
const router = express.Router();
const {allCompany,deleteCompany,updateCompany,registerCompany,oneCompany} =require('../controller/companyController');
const { authAdmin } = require("../middleware/authHandler");
router.use(authAdmin)
router.route('/').post(registerCompany);
router.route('/').get(allCompany);
router.route('/:name').get(oneCompany).put(updateCompany).delete(deleteCompany);

module.exports = router;