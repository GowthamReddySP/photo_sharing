const express = require('express');
const controllers = require('../Controllers/Login');
const router = express.Router();
router.post("/login", controllers.login);
router.post("/addUser", controllers.addUser);
module.exports = router;