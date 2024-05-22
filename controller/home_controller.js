module.exports.home = (req,res)=>{
    console.log(req.cookies);
    res.cookie("Ns", 55) //set/edit cookie
    res.render("home",{title: "home"});
};