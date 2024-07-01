const { Router } = require("express")
const { addGround } = require("../controllers/ground/addGroundController")
const { getOwnerGroundDetail } = require("../controllers/ground/getOwnerGroundDetailController")
const { upload } = require("../utils/multer")
const { auth } = require('../middleware/auth')
const { deleteGround } = require("../controllers/ground/deleteGroundController")
const { getOwnedGrounds } = require("../controllers/ground/getOwnedGroundsController")

const ownerRouter = Router();


ownerRouter.post("/addground", upload.array('photos'), addGround)  //---
// ownerRouter.get("/getownergrounddetail/:id", auth, getOwnerGroundDetail)  
// ownerRouter.get("/getownedgrounds", auth, getOwnedGrounds)
ownerRouter.get("/getownergrounddetail/:id", getOwnerGroundDetail)
ownerRouter.get("/getownedgrounds/:id", getOwnedGrounds)
ownerRouter.delete("/deleteground/:id", auth, deleteGround)


module.exports = ownerRouter;