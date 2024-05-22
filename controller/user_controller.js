const User = require("../models/userschema");
const bcrypt = require("bcrypt");

//profile
module.exports.profile = async (req, res) => {
  try {
    if (req.cookies.User_id) {
      const userid = await User.findById(req.cookies.User_id); // find in db this id
      if (userid) {
        return res.render("user_profile", {
          title: "user profile",
          user: userid,
        });
      }
    }
    res.redirect("/user/signin");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

//Render sign up page
module.exports.signup = (req, res) => {
  res.render("user_signup", { title: "sign up" });
};

// render signin page
module.exports.signin = (req, res) => {
  res.render("user_signin", { title: "sign in" });
};

//get sign up data
module.exports.create = async (req, res) => {
  try {
    const { name, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
      // return res.redirect('back');
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

    const existingUser = await User.findOne({ email: email }); // { email: req.body.email } search in db
    if (existingUser) {
      return res.send(`
            <html>
                <body>
                    <script>
                        alert('Email Already Exist');
                        window.history.back(); // Go back to the previous page
                    </script>
                </body>
            </html>
        `);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: password,
    });

    await newUser.save();
    res.redirect("/user/signin"); // Redirect to login page after successful signup
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

//create login session/ process sign in data
module.exports.createSession = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //find the user
    const existingUser = await User.findOne({ email: email }); // search in db user collection {email:req.body.email} email schema
    if (!existingUser) {
      return res.send(`
        <html>
            <body>
                <script>
                    alert('Email not found');
                    window.history.back(); // Go back to the previous page
                </script>
            </body>
        </html>
    `);
    }

    // handel password not match
    const existingPassword = await User.findOne({ password: password }); // { password: req.body.password } search in db
    if (!existingPassword) {
      return res.send(`
    <html>
        <body>
            <script>
                alert('invalid password');
                window.history.back(); // Go back to the previous page
            </script>
        </body>
    </html>
`);
    }

    //handel session creation
    res.cookie("User_id", existingUser.id); // schema id
    res.redirect("/user/profile");
  } catch (error) {
    // handle user not found
    console.error(err);
    res.status(500).send("Server error");
  }
};

//signOut
module.exports.signOut = (req, res) => {
  // Clear the User_id cookie
  res.clearCookie("User_id");
  // Redirect to the login page or home page
  res.redirect("/user/signin");
};
