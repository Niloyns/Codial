const express = require("express");
const router = express.Router();

const homeController = require("../controller/home_controller")
const user = require("./user");

router.get("/",homeController.home);
router.use("/user",user); //rediract to user router

module.exports = router;
