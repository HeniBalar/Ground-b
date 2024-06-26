const { Router } = require("express")
const { adminauth } = require("../middleware/adminauth")
const { adminSignup } = require("../controllers/admin/adminSignupController")
const { adminLogin } = require("../controllers/admin/adminLoginController");
const { dashboard } = require("../controllers/admin/adminDashboardController");
const { adminShowUsers, adminEditUsers } = require("../controllers/admin/adminShowUsersController");
const { adminShowOwners, adminEditOwners } = require("../controllers/admin/adminShowOwnersControllers");
const { logoutAll } = require("../controllers/admin/adminLogoutController");
const { adminRandR } = require("../controllers/admin/adminRandRController");
const { newGroundRequest } = require("../controllers/admin/newGroundRequestController.js");
const { adminNotifications } = require("../controllers/admin/adminNotificationController");
const { adminDeleteAccount } = require("../controllers/admin/adminDeleteController");

const adminRouter = Router();


adminRouter.post("/adminsignup", adminSignup)
adminRouter.post("/adminlogin", adminLogin)

adminRouter.get("/dashboard", adminauth, dashboard)
adminRouter.post("/admineditusers/:id", adminauth, adminEditUsers)
adminRouter.post("/admineditowners/:id", adminauth, adminEditOwners)
adminRouter.post("/adminshowusers", adminauth, adminShowUsers)
adminRouter.post("/adminshowowners", adminauth, adminShowOwners)
adminRouter.post("/adminreviewandrating", adminauth, adminRandR)  //---
adminRouter.post("/adminnotifications", adminauth, adminNotifications)   //---

adminRouter.post("/verifiedground", adminauth, newGroundRequest)    //---

//adminRouter.get("/adminlogoutall", adminauth, logoutAll)
adminRouter.get("/adminlogout", adminauth, logoutAll)

adminRouter.delete("/admindelete/:id", adminauth, adminDeleteAccount) //--


module.exports = adminRouter;