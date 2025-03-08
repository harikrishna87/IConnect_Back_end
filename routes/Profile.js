const express = require("express")
const router = express.Router()
const {User_details, Loggin_Details} = require("../Controllers/Profile.js")


router.post("/user_details", User_details)
router.get("/login_details", Loggin_Details)


module.exports = router