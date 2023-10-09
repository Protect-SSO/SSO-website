
function verifyAccountType(req,res,next){
    //verify if token is on users browser
    console.log(req.cookies.User.AccountType)
    if(req.cookies.User.AccountType != "Owner" && req.cookies.User.AccountType != "Admin"){
        console.log(req.cookies.User.AccountType)
        console.log("it doesnt")
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