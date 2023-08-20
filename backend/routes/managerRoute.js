const express = require("express");
const router = express.Router();
const {registerManager, deleteManager, loginManager,updateManager,allManager}=require('../controller/managerController');
const {validateToken,authAdmin}=require('../middleware/authHandler');


//to login the manager
router.route('/login').post(loginManager);

//middleware to check if user is authenticated or not authenticated
router.use(validateToken);

//authAdmin middleware to check if user is authenticated Admin or not

//to create the manager
router.route('/register').post(authAdmin,registerManager);

// to getall the manager
// to delete the manager
// to update the manager
router.route('/').get(authAdmin,allManager).put(authAdmin,updateManager).delete(authAdmin,deleteManager);

module.exports = router;
