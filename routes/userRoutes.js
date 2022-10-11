const express = require("express");
const {registerUser, authUser, reserveUser, logoutUser} = require("../Controller/UserController");
const router = express.Router();
const {protect} = require("../Middleware/AuthMiddleware")

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router
// router.post("/login", authUser);
// router.route("/profile").post(protect, updateUserProfile);
// router.route('/homepage').post(protect, reserveUser)
router.route('/logout').get(logoutUser)

module.exports = router;