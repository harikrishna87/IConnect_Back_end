const Meetings = require("../models/Meetings.js");
const { v4: uuidv4 } = require('uuid');

const User_Meetings = async (req, res) => {
    try {
        const { roomID, userID, meetingLink } = req.body;
        if (!meetingLink) {
            return res.status(400).json({ error: "meetingLink is required" });
        }
        const existingMeeting = await Meetings.findOne({ roomID: roomID });
        if (existingMeeting) {
            return res.status(400).json({ error: "A meeting with this roomID already exists" });
        }

        const user_meetings = await Meetings.create({
            roomID: roomID,
            userID: userID,
            meetingLink: meetingLink
        });

        res.status(201).json({ message: "Meeting created successfully", meetings: user_meetings });
    } catch (err) {
        console.log("Error details:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

const Meetings_links = async (req, res) => {
    try {
        const meetings_available = await Meetings.find();
        const uniqueMeetings = Array.from(new Map(meetings_available.map(meeting => [meeting.roomID, meeting])).values());
        
        res.status(200).json({ meetings_available: uniqueMeetings });
    } catch (err) {
        console.log("Error details:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

const Delete_links = async (req, res) => {
    try {
        const { roomID } = req.body;
        if (!roomID) {
            return res.status(400).json({ error: "roomID is required" });
        }

        const deletedMeeting = await Meetings.findOneAndDelete({ roomID: roomID });

        if (!deletedMeeting) {
            return res.status(404).json({ error: "Meeting not found" });
        }

        res.status(200).json({ message: "Meeting deleted successfully" });
    } catch (err) {
        console.log("Error details:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

const Schedule_Meeting = async (req, res) => {
    try {
        const { 
            userID, 
            title, 
            scheduledTime, 
            duration, 
            description = "", 
            participants = [] 
        } = req.body;
        
        console.log("Received scheduling request:", req.body); 
        if (!userID || !title || !scheduledTime || !duration) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing required fields' 
            });
        }
        
        const roomID = uuidv4();
        const baseUrl = process.env.CLIENT_BASE_URL || 'https://i-connect-video-calling-app.vercel.app/';
        const meetingLink = `${baseUrl}/group_call?roomID=${roomID}`;
        const newMeeting = await Meetings.create({
            roomID,
            userID,
            title,
            meetingLink,
            scheduledTime: new Date(scheduledTime),
            duration,
            description,
            participants,
            createdAt: new Date(),
            isScheduled: true,
            isActive: true
        });
        
        console.log("Meeting scheduled successfully:", newMeeting);
        
        res.status(200).json({
            success: true,
            meeting: newMeeting
        });
    } catch (err) {
        console.error("Error scheduling meeting:", err);
        res.status(500).json({
            success: false,
            message: "Failed to schedule meeting: " + err.message
        });
    }
};

module.exports = { 
    User_Meetings, 
    Meetings_links, 
    Delete_links,
    Schedule_Meeting
};