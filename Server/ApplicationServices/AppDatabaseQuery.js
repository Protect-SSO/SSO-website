const {GetUserAppsReq} = require('./AppRequests')

async function GetUserApps (UserName){
    let response = await GetUserAppsReq(UserName)

    return response
}

module.exports = {GetUserApps}