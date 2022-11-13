const express = require("express");
const {registerUser, authUser, reserveUser, logoutUser, scheduleAppointment, getListOfWork} = require("../Controller/UserController");
const{registerWorker, authWorker, updateWorkerProfile} = require("../Controller/WorkerController")
const router = express.Router();
const {protect} = require("../Middleware/AuthMiddleware")

router.route("/register", protect ).post(registerUser);
router.route("/login").post(authUser);
// router.post("/login", authUser);
// router.route("/profile").post(protect, updateUserProfile);
// router.route('/homepage').post(protect, reserveUser)
router.route('/logout').get(logoutUser)
router.route('/').get(protect)
router.route('/registerWorker').post(registerWorker)
router.route('/loginWorker').post(authWorker)
router.route('/appointment-status').post(scheduleAppointment)
router.route('/listofwork').get(getListOfWork)
module.exports = router;