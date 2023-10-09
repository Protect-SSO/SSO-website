
function verifyAccountType(req,res,next){
    //verify if user is owner or admin
    if(req.cookies.User.AccountType != "Owner" && req.cookies.User.AccountType != "Admin"){
        return res.redirect("/")
    }next()
}

function verifyToken(req,res,next){
    //verify if token is on users browser
    if(!req.cookies.Token){
        return res.redirect("/Login")
    }next()
}

module.exports = {verifyToken, verifyAccountType}