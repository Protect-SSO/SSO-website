const {getRoute} = require('./AppRequests')

async function Redirect(req,res){
    let AppName = req.params.AppName;

    let response = await getRoute(AppName)

    res.redirect(response.route + req.cookies.Token)
}

module.exports = {Redirect}