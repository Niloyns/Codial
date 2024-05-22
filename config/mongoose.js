const mongoose = require("mongoose");

//mongodb connection
const db = mongoose.connect("mongodb://localhost/codial_dev")
.then(()=>{console.log("mongo connect success");})
.catch(()=>{console.log("error connection mongodb");});

module.export = db;