const {GetUserAppsReq,GetAppsReq} = require('./AppRequests')

async function GetUserApps (UserName){
    let response = await GetUserAppsReq(UserName)

    return response
}
async function GetApps (OrgName){
    let response = await GetAppsReq(OrgName)

    return response
}

module.exports = {GetUserApps,GetApps}