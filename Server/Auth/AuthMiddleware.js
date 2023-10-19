const {DecodeToken} = require('./AuthRequest');

function verifyAccountType(req,res,next){
    //verify if user is owner or admin
    if(req.cookies.User.AccountType != "Owner" && req.cookies.User.AccountType != "Admin"){
        return res.redirect("/")
    }next()
}

async function verifyToken(req,res,next){
    //verify if token is on users browser
    let response = await DecodeToken(req.cookies.Token)
    if(response.error == "Invalid token" || response.error == "expired" || !req.cookies.Token){
        return res.redirect("/Login")
    }next()
}

module.exports = {verifyToken, verifyAccountType}