const mongoose = require('mongoose');
const meetingSchema = new mongoose.Schema({
    roomID: {
        type: String,
        required: true,
        unique: true
    },
    userID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: "Meeting"
    },
    meetingLink: {
        type: String,
        required: true
    },
    scheduledTime: {
        type: Date
    },
    duration: {
        type: Number,
        default: 30
    },
    description: {
        type: String,
        default: ""
    },
    participants: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isScheduled: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const Meetings = mongoose.model('Meetings', meetingSchema);

module.exports = Meetings;