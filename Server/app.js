const express = require('express');
const path = require('path');
const {Login, RegisterOrg, RegisterUser} = require('./Auth/AuthRoutes')
const cookieParser = require('cookie-parser')
const {verifyToken, verifyAccountType} = require('./Auth/AuthMiddleware')
const {GetUserApps} = require('./ApplicationServices/AppDatabaseQuery')
const {Redirect} = require('./ApplicationServices/AppRoutes')

const port = "3000"
const app = express();

//middle ware funtions
//set up server to locate static applications and EJS pages
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('views', path.join(__dirname, '../Client/views'));//show express the views directory
app.use('/images', express.static(path.join(__dirname, '../Client/images')));
app.use('/Partials',express.static(path.join(__dirname, '../Client/Partials')));

//Protected Get routes
app.get('/', verifyToken, async(req,res)=>{
    //Renders the dashboard page
    const User = req.cookies.User
    let Apps = await GetUserApps(User.UserName)
    res.render("dashboard",{User,Apps})
})
app.get('/RegisterUser', verifyToken, verifyAccountType,(req,res)=>{
    //Renders the dashboard page
    const User = req.cookies.User
    res.render("RegisterUser",{User})
})

//get routes
app.get("/Login", function(req, res){
    //Renders the Login page
    res.render("Login")
})
app.get("/RegisterOrg", function(req, res){
    //Renders the Organization register page
    res.render("RegisterOrg")
})
app.get("/RegOrgSuccess", function(req, res){
    //Renders the register success page after registering an organization
    res.render("RegOrgSuccess")
})
app.get("/RegUserSuccess", function(req, res){
    //Renders the register success page after registering an organization
    res.render("RegUserSuccess")
})
app.get("/SignOut", function(req, res){
    //Signs user out
    res.clearCookie("Token")
    res.clearCookie("User")
    res.redirect("/Login")
})


app.get("/Redirect/:AppName", Redirect)


//Post routs
app.post("/Login", Login)//route that logs user in
app.post("/RegisterOrg", RegisterOrg)//route that logs org in
app.post("/RegisterUser", RegisterUser)//route that logs user in

app.listen(port, ()=>{//server listens on port 3000
    console.log("website hosted on port " + port)
    console.log("go to localhost:3000 in your Browser")
})