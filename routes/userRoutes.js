const { Router } = require("express")
const { getSingleGround } = require("../controllers/ground/getSingleGroundController")
const { addReview } = require("../controllers/addReviewController")
const { auth } = require('../middleware/auth');
const { bookGround } = require("../controllers/ground/bookGroundController");
const { createTeam, getTeam, getallplayers, getallteams, acceptTeamInvite, rejectTeamInvite } = require("../controllers/teamController");


const userRouter = Router();


userRouter.get("/getsingleground/:id", auth, getSingleGround)
userRouter.post("/addreview", auth, addReview)
userRouter.post("/bookground",auth, bookGround)
userRouter.post("/createteam", auth, createTeam)
userRouter.get("/getteamdetail/:id", auth, getTeam)
userRouter.get("/getallplayers", auth, getallplayers)
userRouter.get("/getallteams", auth, getallteams)
userRouter.post("/acceptteaminvite", auth, acceptTeamInvite)  //---
userRouter.post("/rejectteaminvite", auth, rejectTeamInvite)  //---

module.exports = userRouter;