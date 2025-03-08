const express = require("express")
const router = express.Router()
const User_details = require("../Controllers/Profile.js")


router.post("/user_details", User_details)


module.exports = router