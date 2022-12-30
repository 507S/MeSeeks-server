const express = require("express");;
const router = express.Router();
const multer = require("multer");
const workerController= require("../controller/WorkerController")
const appealMsgController = require("../controller/msg/appealMsgController")

router.post("/sendappealmsg/:id",appealMsgController.sendAppealMsg);

router.get("/getappealmsg",appealMsgController.getAppealMsg);
router.get("/getworker/:id",workerController.getworker);

const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: Storage, limits: { fieldSize: 25 * 1024 * 1024 }
}).single('image')

router.patch("/updateProfile/:id" ,upload, workerController.updateWorkerProfile );

module.exports =router;