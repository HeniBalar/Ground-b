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
const { adminForgotPassword } = require("../controllers/admin/adminForgetPasswordController");
const { adminEmailVerification, adminVerifyOtp } = require("../controllers/admin/adminEmailVerification");

const adminRouter = Router();


adminRouter.post("/adminsignup", adminSignup)
adminRouter.post("/adminlogin", adminLogin)
adminRouter.post("/adminemailverification", adminEmailVerification)
adminRouter.post('/adminforgotpassword', adminForgotPassword)
adminRouter.post('/verifyadminotp', adminVerifyOtp)

adminRouter.get("/dashboard", dashboard)
adminRouter.post("/admineditusers/:id", adminEditUsers)
adminRouter.post("/admineditowners/:id", adminEditOwners)
adminRouter.post("/adminshowusers", adminShowUsers)
adminRouter.post("/adminshowowners", adminShowOwners)
adminRouter.post("/adminreviewandrating", adminRandR)  //---
adminRouter.post("/adminnotifications", adminNotifications)   //---

adminRouter.post("/verifiedground", newGroundRequest)    //---

//adminRouter.get("/adminlogoutall", adminauth, logoutAll)
adminRouter.get("/adminlogout", adminauth, logoutAll)

adminRouter.delete("/admindelete/:id", adminDeleteAccount) //--


module.exports = adminRouter;