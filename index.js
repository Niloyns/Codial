const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

const router = require("./routes/router");
// const user = require("./routes/user");
const db = require("./config/mongoose");
const passportLocal = require("./config/passport-local-strategy");

const app = express();

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());

// Serve static files (CSS, JS, images)
app.use(express.static("./assets"));

// Use express-ejs-layouts for layout management
app.use(expressLayouts);
app.set("layout extractStyles", true); // Extract styles from subpages into layout
app.set("layout extractScripts", true); // Extract scripts from subpages into layout

// Setup view engine for EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session middleware
app.use(session({
    name: "codial",
    secret: "niloyns", // TODO: Change the secret before production
    resave: false,
    saveUninitialized: false, // Add this option to avoid the deprecation warning
    cookie: {
        maxAge: 1000 * 60 * 100 // Cookie expiration time in milliseconds
    }
}));

// Passport middleware for authentication
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", router);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
