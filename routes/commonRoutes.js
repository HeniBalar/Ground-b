const { Router } = require("express")
const { getGrounds } = require("../controllers/ground/getGroundsController")
const { sendOTP, verifyOTP } = require("../controllers/signin/otpController")
const { logout, logoutAll } =  require("../controllers/logoutController")
const { authGoogle } = require("../controllers/signin/googleController");
const { authApple } = require("../controllers/signin/appleController");
const { authFacebook } = require("../controllers/signin/facebookController")
const { auth } = require('../middleware/auth');
const { changeLanguage } = require("../controllers/changeLanguageController");
const { deleteAccount } = require("../controllers/deleteAccountController");
const { sendConfirmation } = require("../controllers/notification/confirmationController");
const { sendNotification } = require("../controllers/notification/notificationController");
const { getNotification } = require("../controllers/getNotificationController");
const { setFCMToken } = require("../controllers/fcmTokenController");
const { getBookings } = require("../controllers/bookingController");
const { getSportsCategory } = require("../controllers/sportsCategoryController");
const { registerUser } = require("../controllers/signin/registerUserController");
const { loginUser } = require("../controllers/signin/loginUserController");
const { editUser } = require("../controllers/signin/editUserController");
const { editUserPicture } = require("../controllers/signin/editUserPictureController");
const multer = require('multer');
const { paymentGetway } = require("../controllers/signin/paymentGetwayController");
const { addWishList, removeWishList, getAllWishList} = require("../controllers/signin/wishListUser");

const storage = multer.diskStorage({})
const upload = multer({ storage })

const commonRouter = Router();


commonRouter.get("/", (req,res)=>{
    try {
        console.log("aaaaGround Backend")
        res.send('Ground Backend')
        
    } catch (error) {
        console.log("error Backend")
        
    }
})

commonRouter.post("/sendotp", sendOTP)
commonRouter.post("/verifyotp/:userType", verifyOTP)


//new apis
commonRouter.post("/register",registerUser)
commonRouter.post('/login',loginUser)
commonRouter.post('/editprofile',editUser)
commonRouter.post('/editprofilepicture',upload.single('profile'),editUserPicture)
commonRouter.post('/payment-gateway',paymentGetway)  //---



commonRouter.get("/auth/google/:userType/:idToken", authGoogle)  //---
commonRouter.get("/auth/apple/:userType/:idToken", authApple)   //---
commonRouter.get("/auth/facebook/:userType/:idToken", authFacebook)   //---

commonRouter.post("/getgrounds", getGrounds)
commonRouter.get("/getsportscategories", getSportsCategory)

commonRouter.get("/getbookings", auth, getBookings)

commonRouter.post("/changelang",changeLanguage)
commonRouter.post("/setfcmtoken", auth, setFCMToken)

commonRouter.post("/sendnotification", auth, sendNotification)
commonRouter.post("/sendconfirmation", auth, sendConfirmation)

commonRouter.get("/getnotifications", auth, getNotification)

commonRouter.get("/logout", auth, logout)
commonRouter.get("/logoutall", auth, logoutAll)

commonRouter.delete("/deleteaccount", auth, deleteAccount)

//add favourite ground
commonRouter.post('/addWishList', auth, addWishList)
commonRouter.post('/removeWishList', auth, removeWishList)
commonRouter.get('/getAllWishList', auth, getAllWishList)
module.exports = commonRouter;