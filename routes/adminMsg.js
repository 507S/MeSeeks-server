const express = require("express");;
const router = express.Router();
const appealMsg = require("../model/msg/appealMsgSchema")
const adminMsgController = require("../controller/msg/adminMsgController")

router.post("/sendadminmsg",adminMsgController.sendAdminMsg);

router.get("/getadminmsg/:id",adminMsgController.getAdminMsg);

module.exports =router;