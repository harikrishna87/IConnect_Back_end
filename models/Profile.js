const Mongoose = require("mongoose");

const User_Schema = new Mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    }, 
    photoURL : {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const users = Mongoose.model("Users", User_Schema);
module.exports = users;
