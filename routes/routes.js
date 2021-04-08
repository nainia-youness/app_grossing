// routes/routes.js
const express = require("express");
const  router = express.Router();
// Middlewares
const  authorize = require("../middlewares/authorize");
const  checkRequestRegister = require("../middlewares/registerValidator");
const  checkRequestStats = require("../middlewares/statsValidator");
const  checkRequestFilter = require("../middlewares/filterValidator");
const  checkRequestApps = require("../middlewares/appsValidator");
const  checkRequestDev = require("../middlewares/devValidator");
// Controllers
const  authController= require('../controllers/authController');
const  profileController= require('../controllers/profileController');
const  statsController= require('../controllers/statsController');
const  filterController= require('../controllers/filterController');
const  appsController= require('../controllers/appsController');
const  devController= require('../controllers/devController');


/********************************** Authentication *********************************/

// Sign-up
router.post("/register",checkRequestRegister() ,authController.signup );


// Sign-in
router.post("/login",authController.login);


// log-out
router.post("/logout",authController.logout);


// Refresh Token
router.post("/rToken",authController.rtoken);



/********************************** Admins *********************************/


// Get Users
router.route('/users').get(profileController.getUsers);


// Get Single User
router.route('/user-profile/:email').get(authorize, profileController.getSingleUser)


// Update User
router.route('/update-user/:email').put(profileController.updateUser)


// Delete User    
router.route('/delete-user/:email').delete(profileController.deleteUser)



/********************************** Body *********************************/


// Statistics
router.post("/statistics",authorize,checkRequestStats(),statsController.stats);


// Filter
router.post("/filter",authorize,checkRequestFilter(),filterController.filter);


// appContent
router.route('/apps/:pckge').get(authorize, checkRequestApps(), appsController.appsContent)

// developer
router.route('/developer/:devname').get(authorize, checkRequestDev(), devController.devApp)



module.exports = router;