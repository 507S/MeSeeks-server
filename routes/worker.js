const express = require("express");;
const router = express.Router();
const appealMsg = require("../model/msg/appealMsgSchema")
const appealMsgController = require("../controller/msg/appealMsgController")

router.post("/sendappealmsg/:id",appealMsgController.sendAppealMsg);

router.get("/getappealmsg",appealMsgController.getAppealMsg);

module.exports =router;