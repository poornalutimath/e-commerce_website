const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

const usersFile = "users.json";

// Load users from file
const loadUsers = () => {
    if (fs.existsSync(usersFile)) {
        return JSON.parse(fs.readFileSync(usersFile, "utf8"));
    }
    return [];
};

// Save users to file
const saveUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

// Handle login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "Invalid email or password! Try signing up." });
    }
});

// Handle signup
app.post("/signup", (req, res) => {
    const { email, password } = req.body;
    let users = loadUsers();

    if (users.find(u => u.email === email)) {
        return res.json({ success: false, message: "Email already exists! Try logging in." });
    }

    users.push({ email, password });
    saveUsers(users);

    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
