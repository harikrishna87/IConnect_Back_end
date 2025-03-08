const users = require("../models/Profile.js");

const User_details = async (req, res) => {
    try {
        const { username, email, uid, photoURL } = req.body;

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

const Users = async(req, res) => {
    try {
        const users = await users.find();
        res.status(200).json(users);
    }
    catch(err) {
        console.error(err);
    }
}

module.exports = {User_details, Users};
