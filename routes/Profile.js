const express = require("express")
const router = express.Router()
const {User_details, Users} = require("../Controllers/Profile.js")


router.post("/user_details", User_details)
router.get("/loggedusers", Users)


module.exports = router