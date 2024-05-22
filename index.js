const express = require("express");
const router = require("./routes/router");
// const user = require("./routes/user");
const path = require("path")
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const cookieparser = require("cookie-parser");


const app = express();

//form data get
app.use(express.urlencoded({ extended: true }));
//cookie
app.use(cookieparser());

//use css/js in app
app.use(express.static("./assets"));

//express-ejs-layouts
app.use(expressLayouts);
app.set("layout extractStyles", true); //extract style from sub page into layout
app.set("layout extractScripts", true);

//route to controller
app.use("/",router);

//setup view engine for ejs
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

//start server
app.listen(5000,()=>{
    console.log("running 5000");
});