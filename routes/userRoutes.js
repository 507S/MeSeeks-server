const express = require("express");
const {registerUser, authUser, reserveUser, logoutUser} = require("../Controller/UserController");
const{workerInfo} = require("../Controller/WorkerController")
const router = express.Router();
const {protect} = require("../Middleware/AuthMiddleware")

router.route("/register", protect ).post(registerUser);
router.route("/login").post(authUser);
// router.post("/login", authUser);
// router.route("/profile").post(protect, updateUserProfile);
// router.route('/homepage').post(protect, reserveUser)
router.route('/logout').get(logoutUser)
router.route('/').get(protect)
router.route('/workerProfile').post(protect, workerInfo)

module.exports = router;