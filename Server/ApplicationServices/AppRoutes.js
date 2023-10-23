const {getRoute, RegisterAppReq} = require('./AppRequests')

async function Redirect(req,res){
    let AppName = req.params.AppName;

    let response = await getRoute(AppName)

    res.redirect(response.route + req.cookies.Token)
}
async function RegisterApp(req,res){
    let AppName = req.body.AppName;
    let RedirectURL = req.body.RedirectURL;
    let OrgName = req.cookies.User.OrgName;
    console.log(RedirectURL)
    let response = await RegisterAppReq(AppName,RedirectURL,OrgName)

    if(response.Registered == "True"){
        //if register was successful
        return res.redirect("/RegAppSuccess")
    }else{
        //if register was a failure
        const User = req.cookies.User
        return res.render("RegisterApp",{User} )
    }
}

module.exports = {Redirect, RegisterApp}