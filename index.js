import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import session from "express-session";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// Add session middleware configuration
app.use(session({
    secret: 'your-secret-key',  // Change this to a secure secret key
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Add these dummy credentials for testing
const adminCredentials = {
    id: "ADMIN123",
    password: "admin"
};

const userCredentials = {
    email: "user@example.com",
    password: "user12345"
};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to check authentication
function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
}

// Admin authentication middleware
function requireAdminAuth(req, res, next) {
    if (!req.session.adminId) {
        return res.redirect('/admin-login');
    }
    next();
}

app.post("/checkUser", (req, res) => {
    const { email, password } = req.body;
    
    if (email === userCredentials.email && password === userCredentials.password) {
        // Set session variables
        req.session.userId = email;
        req.session.userType = 'user';
        res.redirect('/user-dashboard');
    } else {
        res.redirect('/login?error=invalid');
    }
});

app.post("/checkAdmin", (req, res) => {
    const { adminId, password } = req.body;
    
    if (adminId === adminCredentials.id && password === adminCredentials.password) {
        // Set session variables
        req.session.adminId = adminId;
        req.session.userType = 'admin';
        res.redirect('/admin-dashboard');
    } else {
        res.redirect('/admin-login?error=invalid');
    }
});

// Add logout route
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
        }
        res.redirect('/');
    });
});

// Protected routes using authentication middleware
app.get("/admin-dashboard", requireAdminAuth, (req, res) => {
    res.sendFile(__dirname + "/public/admin-dashboard.html");
});

app.get("/user-dashboard", requireAuth, (req, res) => {
    res.sendFile(__dirname + "/public/user-dashboard.html");
});

// Routes
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get(["/about", "/about.html"], (req, res) => {
    res.sendFile(__dirname + "/public/about.html");
});

app.get(["/contact", "/contact.html"], (req, res) => {
    res.sendFile(__dirname + "/public/contact.html");
});

// Login routes
app.get(["/login", "/login.html"], (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});

app.get(["/admin-login", "/admin-login.html"], (req, res) => {
    res.sendFile(__dirname + "/public/admin-login.html");
});

app.get(["/signup", "/signup.html"], (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
