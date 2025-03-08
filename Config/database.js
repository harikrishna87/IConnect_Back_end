const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();


const Mongo_Uri = `mongodb+srv://${process.env.Mongo_User}:${process.env.Mongo_Pass}@vca.lzuwr.mongodb.net/user_regsitrations?retryWrites=true&w=majority&appName=vca`

const database = mongoose.connect(Mongo_Uri)
.then(() => console.log("MongoDB Connected Successfully!!"))
.catch((err) => console.log("Error Occured while connecting to the Database", err))

module.exports = database;