const express = require("express")
const app = express()
const cookie = require("cookie-parser")
const Mongo_DataBase_Connection = require("./Config/database.js")
const cors = require("cors");
const router = require("./routes/Profile.js");
const meeting_router = require("./routes/Meetings.js")

// MongoDB connection 
Mongo_DataBase_Connection

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookie())
app.use(cors())

// Dummy Api 
app.get("/", (req, res) => {
    res.send("Hello World!");
})

// Routes 
app.use("/users", router)
app.use("/meet", meeting_router )

app.listen(4000, () => {
    console.log("Server is running on port 4000");
})