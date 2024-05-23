const express = require("express");
const userController = require("../controller/user_controller")
const passport = require("../config/passport-local-strategy");
// const passportImport = require("../config/passport-local-strategy");

const router = express.Router();

//
router.get("/profile", passport.checkAuthentication,userController.profile);
router.get("/signin",userController.signin);
router.get("/signup",userController.signup);

router.post("/create",userController.create);

// Use passport as a middleware to authenticate
// Passport first authenticates with the "local" strategy.
// If authentication fails, redirect to "/user/signin".
// If successful, proceed to userController.createSession.
router.post("/create-session", passport.authenticate("local", {
    failureRedirect: "/user/signin"
}), userController.createSession);

router.post("/sign-out",userController.signOut);

module.exports = router;