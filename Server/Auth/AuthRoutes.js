const {LoginReq, OrgRegisterReq} = require('./AuthRequest')


async function Login(req, res){
    //function for logging in a user
    
    //user request input
    let UserName = req.body.UserName
    let Password = req.body.Password

    //request function made to Auth API
    let value = await LoginReq(UserName, Password)
    console.log(value.Login)
    if(value.Login == "True"){
        //if Login equatls true
        res.cookie('Token', 'testVal');
        res.cookie('User', value.User);
        return res.redirect("/")
    }else{
        //if login was a failure
        return res.render("Login")
    }
}

async function RegisterOrg(req, res){
    //function to register an org and org owner
    
    //user request input
    let OrgName = req.body.OrgName
    let UserName = req.body.UserName
    let Password = req.body.Password
    let FirstName = req.body.FirstName
    let LastName = req.body.LastName
    let Email = req.body.Email
    
    //request function made to Auth API
    let value = await OrgRegisterReq(OrgName, UserName, Password, FirstName, LastName, Email)
    console.log(value.Registered)
    
    if(value.Registered == "True"){
        //if register was successful
        return res.redirect("/RegOrgSuccess")
    }else{
        //if register was a failure
        return res.render("RegisterOrg")
    }
}

module.exports={Login, RegisterOrg}