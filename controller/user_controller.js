const User = require("../models/userschema");
const bcrypt = require("bcrypt");

// Render user profile
module.exports.profile = async (req, res) => {
  return res.render('user_profile', {
    title: 'User Profile'
  });
};

// Render sign up page
module.exports.signup = (req, res) => {
  res.render("user_signup", { title: "Sign Up" });
};

// Render sign in page
module.exports.signin = (req, res) => {
  res.render("user_signin", { title: "Sign In" });
};

// Handle sign up data
module.exports.create = async (req, res) => {
  try {
    const { name, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
      return res.send(`
        <html>
          <body>
            <script>
              alert('Passwords do not match!');
              window.history.back(); // Go back to the previous page
            </script>
          </body>
        </html>
      `);
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.send(`
        <html>
          <body>
            <script>
              alert('Email Already Exists');
              window.history.back(); // Go back to the previous page
            </script>
          </body>
        </html>
      `);
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: password
    });

    await newUser.save();
    res.redirect("/user/signin"); // Redirect to login page after successful signup
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Create login session / process sign in data
module.exports.createSession = async (req, res) => {
  return res.redirect("/");
};

// Sign out
module.exports.signOut = (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
};
