const express = require("express");
const userController = require("../controller/user_controller")

const router = express.Router();

//
router.get("/profile",userController.profile);
router.get("/signin",userController.signin);
router.get("/signup",userController.signup);
router.post("/create",userController.create);
router.post("/create-session",userController.createSession);
router.post("/sign-out",userController.signOut);

module.exports = router;