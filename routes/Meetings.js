const express = require("express");
const meeting_router = express.Router()
const {User_Meetings, Meetings_links, Delete_links} = require("../Controllers/Meetings.js")


meeting_router.post("/meetings", User_Meetings);
meeting_router.get("/meetings/links", Meetings_links);
meeting_router.post("/meetings/delete", Delete_links)

module.exports = meeting_router;