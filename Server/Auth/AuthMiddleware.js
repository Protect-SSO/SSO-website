const {DecodeToken} = require('./AuthRequest');

function verifyAccountType(req,res,next){
    //verify if user is owner or admin
    if(req.cookies.User.AccountType != "Owner" && req.cookies.User.AccountType != "Admin"){
        return res.redirect("/")
    }next()
}

async function verifyToken(req,res,next){
    //verify if token is on users browser
    if(!req.cookies.Token){
        return res.redirect("/Login")
    }
    let response = await DecodeToken(req.cookies.Token)
    if(response.error == "Invalid token" || response.error == "expired"){
        return res.redirect("/Login")
    }next()
}

function IfNotSupport(req,res,next){
    //verify if user is owner or admin
    if(req.cookies.User.AccountType != "Support"){
        return res.redirect('/Login')
    }next()
}

module.exports = {verifyToken, verifyAccountType, IfNotSupport}