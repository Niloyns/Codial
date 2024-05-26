const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userschema");
const bcrypt = require("bcrypt");

// Authentication using passport
passport.use(new LocalStrategy( // we need to tell passsport user this stratagy
    {
        usernameField: 'email' // Specify that 'email' should be used instead of 'username'
    },
    async (email, password, done) => { // 'done' is a callback function reporting back to passport
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                console.log("User not found in passport");
                return done(null, false); // No error, but user not found
            }

            // Check if the password matches
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                return done(null, user); // Authentication successful / return user to serializeUser
            } else {
                console.log("Invalid email/password");
                return done(null, false); // Invalid password
            }
        } catch (error) {
            return done(error);
        }
    }
));

// Serialize use to set cookie in the browser (express-session library using for encrypted)
passport.serializeUser((user, done) => {
    done(null, user.id);  // set only user _id
});




// Deserialize user to get cookie from the browser
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id); // User.findById(id) fetches the user document from the users collection in MongoDB where the _id matches the provided id.
        done(null, user);
    } catch (error) {
        done(error);
    }
});


// Check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
    // If the user is signed in, then pass on the request to the next function (controller action)
    if (req.isAuthenticated()) { //  This is a method provided by Passport.js that returns true if the user is authenticated and false otherwise.
        return next();
    }
    // If the user is not signed in, redirect to the sign-in page
    return res.redirect("/user/signin");
};


//set the user
passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        // req.user contains the current signed-in user from the session cookie
        res.locals.user = req.user; // Set the authenticated user to res.locals.user
    }
    next();
};


module.exports = passport;
