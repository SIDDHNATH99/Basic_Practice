require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const { Getalldetails } = require('./model/postgresfunctions');

app.use(express.json());
const PORT = process.env.PORT || 5000;


// Fetch user comments from an external API
async function fetchUserComments(userId) {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?userId=${userId}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch comments");
    }
}

async function fetchgrocerydata(userId) {

    try {

        let query = `select * from groceries where id=${userId}`;

        const data = await Getalldetails(query);

        return data;

    } catch (error) {

        // console.log(error)
        throw new Error("Failed to fetch grocerydata");

    }

}

async function fetchusers(userId) {

    try {

        let query = `select * from users where id=${userId}`;

        const data = await Getalldetails(query);

        return data;

    } catch (e) {
        throw new Error("Failed to fetch users");

    }

}



// GET /user-dashboard/:userId
app.get("/user-dashboard/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const [user, posts, comments] = await Promise.all([
            fetchusers(userId),
            fetchgrocerydata(userId),
            fetchUserComments(userId)
        ]);

        // console.log(user , posts , comments);

        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({user, posts, comments});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
