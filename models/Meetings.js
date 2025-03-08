const mongoose = require("mongoose");

const Meeting_Schema = new mongoose.Schema({
    roomID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    meetingLink: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: { 
        type: Date, 
        default: () => new Date(Date.now() + 5 * 60 * 60 * 1000),
        index: { expires: '0' }
    }
});

const Meetings = mongoose.model("Meetings", Meeting_Schema);
module.exports = Meetings;
