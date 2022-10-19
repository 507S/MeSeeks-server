const express = require("express");;
const router = express.Router();
const services = require("../model/serviceSchema")
const serviceController = require("../controller/serviceController")

//get services
router.get("/getservice",serviceController.getservice);

// add services
router.post("/addservice",serviceController.addservice);


//get individual service
// router.get("/getservice/:id",function(req,res){serviceController.getindividualservice});

//delete category
router.delete("/deleteservice/:id",serviceController.deleteservice);





module.exports =router;