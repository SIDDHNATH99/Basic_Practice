const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 5000;

// Simulating database calls (Promise-based)
function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === 2) {
                resolve({ id: 1, name: "John Doe", email: "john@example.com" });
            } else {
                reject("User not found");
            }
        }, 2000);
    });
}

function fetchUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 101, title: "First Post" },
                { id: 102, title: "Second Post" }
            ]);
        }, 1500);
    });
}

function fetchUserComments(userId) {
    return axios.get(`https://jsonplaceholder.typicode.com/comments?userId=${userId}`)
        .then(response => response.data)
        .catch(error => Promise.reject("Error fetching comments"));
}

// API Endpoint: GET /user-dashboard/:userId
app.get("/user-dashboard/:userId", async (req, res) => {
    console.log("userid>" , req.params.userId);
    const userId = parseInt(req.params.userId);
    console.log(userId);

    try {
        // Fetching user, posts, and comments in parallel
        const [user, posts, comments] = await Promise.all([
            fetchUser(userId),
            fetchUserPosts(userId),
            fetchUserComments(userId)
        ]);

        // Sending combined data as response
        res.json({
            user,
            posts,
            comments
        });

    } catch (error) {
        res.status(500).json({ error });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));