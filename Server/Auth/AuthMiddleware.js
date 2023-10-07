
function verifyToken(req,res,next){
    //verify if token is on users browser
    if(!req.cookies.Token){
        return res.redirect("/Login")
    }next()
}

module.exports = {verifyToken}