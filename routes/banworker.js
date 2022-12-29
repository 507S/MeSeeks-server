const express = require("express");;
const router = express.Router();
const banController = require("../controller/banController")


router.get("/getbannedlist",banController.getBannedWorker);

// add services
// router.post("/addbannedworker",banController.addBannedWorker);


//get individual service
// router.get("/getservice/:id",function(req,res){banController.getindividualservice});

//delete category
router.delete("/unbanworker/:id",banController.unbanWorker);
// router.post("/findworker",banController.findWorker);

module.exports =router;