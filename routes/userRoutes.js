const express = require("express");
const {registerUser, authUser, reserveUser, logoutUser, scheduleAppointment, getListOfWork, deleteWork, completeWork, ugetCompletedWork, ugetPendingWork} = require("../Controller/UserController");
const{registerWorker, authWorker, updateWorkerProfile, getWorkerListOfWork, categorizeWork, acceptWork, getPendingWork, getCompletedWork,} = require("../Controller/WorkerController")
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
router.route('/listofwork/:uid').get(getListOfWork)
router.route('/delete-work').post(deleteWork)
router.route('/complete-work').post(completeWork)
router.route('/users/pending/:uid').get(ugetPendingWork)
router.route('/users/completed/:uid').get(ugetCompletedWork)
router.route('/workers/a-r/:category').get(categorizeWork)
router.route('/workers/accept-work').post(acceptWork)
//worker routes
router.route('/work-request').get(getWorkerListOfWork)
router.route('/workers/pending/:uid').get(getPendingWork)
router.route('/workers/completed/:uid').get(getCompletedWork)

module.exports = router;