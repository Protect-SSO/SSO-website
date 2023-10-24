const express = require('express');
const path = require('path');
const {Login, RegisterOrg, RegisterUser} = require('./Auth/AuthRoutes')
const cookieParser = require('cookie-parser')
const {verifyToken, verifyAccountType, IfNotSupport} = require('./Auth/AuthMiddleware')
const {GetUserApps,GetApps, GetRequests, GetOrgRequests} = require('./ApplicationServices/AppDatabaseQuery')
const {Redirect, RegisterApp, RequestApp} = require('./ApplicationServices/AppRoutes')

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
app.get('/SupportDash', verifyToken, IfNotSupport, async(req,res)=>{
    //Renders the dashboard page
    const User = req.cookies.User
    let requestedApps = await GetOrgRequests(User.OrgName)
    console.log(GetOrgRequests)
    res.render("SupportDash",{User,requestedApps})
})
app.get('/RegisterUser', verifyToken, verifyAccountType,(req,res)=>{
    const User = req.cookies.User
    res.render("RegisterUser",{User})
})
app.get('/RegisterApp', verifyToken,(req,res)=>{
    const User = req.cookies.User
    res.render("RegisterApp",{User})
})
app.get('/RequestApp', verifyToken,async(req,res)=>{
    const User = req.cookies.User
    let Apps = await GetApps(User.OrgName)
    let OwnedApps = await GetUserApps(User.UserName)
    let requestedApps = await GetRequests(User.UserName)

    for(let loop = 0; loop < Apps.length; loop++){
        for(let loop2 = 0; loop2 < OwnedApps.length; loop2++){
            if(Apps[loop][0] == OwnedApps[loop2][0]){
                console.log("yes")
                var index = Apps[loop].indexOf(OwnedApps[loop2][0]);
                if (index !== -1) {
                    Apps[loop].splice(index, 1);
                }
            }else{
                console.log("false")
            }
        }
        
    }
    for(let loop = 0; loop < Apps.length; loop++){
        for(let loop2 = 0; loop2 < requestedApps.length; loop2++){
            if(Apps[loop][0] == requestedApps[loop2][0]){
                console.log("yes")
                var index = Apps[loop].indexOf(requestedApps[loop2][0]);
                if (index !== -1) {
                    Apps[loop].splice(index, 1);
                }
            }else{
                console.log("false")
            }
        }
        
    }
    Apps = Apps.filter(e => e.length != 0)
    console.log(OwnedApps)
    console.log(Apps)
    console.log(requestedApps)
    res.render("RequestApp",{User, Apps, requestedApps})
})
app.get("/Redirect/:AppName",verifyToken, Redirect)//redirects a user to a app from dashboard
app.get("/RegUserSuccess",verifyToken, function(req, res){
    //Renders the register success page after registering a user
    const User = req.cookies.User
    res.render("RegUserSuccess",{User})
})
app.get("/RegAppSuccess",verifyToken, function(req, res){
    //Renders the register success page after registering an App
    const User = req.cookies.User
    res.render("RegisterAppSuccess",{User})
})

//get routes
app.get("/Login", function(req, res){
    //Renders the Login page
    const error = ""
    return res.render("Login",{error})
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
app.get("/RegOrgSuccess", function(req, res){
    //Renders the register success page after registering an organization
    res.render("RegOrgSuccess")
})




//Post routs
app.post("/Login", Login)//route that logs user in
app.post("/RegisterOrg", RegisterOrg)//
app.post("/RegisterUser", verifyToken, RegisterUser)//
app.post("/RegisterApp", verifyToken, RegisterApp)//
app.post("/RequestApp/:AppName", verifyToken, RequestApp)//

app.listen(port, ()=>{//server listens on port 3000
    console.log("website hosted on port " + port)
    console.log("go to localhost:3000 in your Browser")
})