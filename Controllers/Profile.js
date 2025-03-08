const users = require("../models/Profile.js");

// Register User (Avoid Duplicates)
const User_details = async (req, res) => {
    try {
        const { username, email, uid, photoURL } = req.body;

        // Check if user already exists by uid or email
        const existingUser = await users.findOne({ $or: [{ email: email }, { uid: uid }] });
        if (existingUser) {
            return res.status(200).json({ message: "User already registered", user: existingUser });
        }

        // If not, create a new user
        const new_user = await users.create({
            username: username,
            email: email,
            uid: uid,
            photoURL: photoURL
        });

        res.status(201).json({ message: "User registered successfully", user: new_user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

const Loggin_Details = async (req, res) => {
    try {
        const uniqueUsers = await users.aggregate([
            {
                $match: {
                    uid: { $ne: null },
                    email: { $ne: null }
                }
            },
            {
                $group: {
                    _id: "$uid",
                    username: { $first: "$username" },
                    email: { $first: "$email" },
                    photoURL: { $first: "$photoURL" },
                    createdAt: { $first: "$createdAt" }
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);

        res.status(200).json(uniqueUsers);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { User_details, Loggin_Details };
