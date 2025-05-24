const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

const JWT_SECRET = 'asecretkey'; // use process.env.JWT_SECRET in real apps

// In-memory user storage (Replace with DB in production)
const users = [];

// Helper: Generate JWT
const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
};

// Middleware: Protect Routes
const authenticateJWT = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    
    if (authHeader?.startsWith('Bearer ')) {

        // console.log("authHeader" , authHeader);

        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: 'Invalid token' });
            req.user = user;
            next();
        });

    } else {
        res.status(401).json({ message: 'Token required' });
    }
};

// Route: Signup
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    const existing = users.find(u => u.username === username);
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, username, password: hashedPassword };
    users.push(user);

    const token = generateToken(user);
    res.json({ token });

});

// Route: Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ token });
});

// Route: Protected
app.get('/profile', authenticateJWT, (req, res) => {
    res.json({ message: `Hello ${req.user.username}, this is your profile.` });
});

// Start Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
