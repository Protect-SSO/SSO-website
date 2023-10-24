const {GetUserAppsReq,GetAppsReq, GetRequestsReq} = require('./AppRequests')

async function GetUserApps (UserName){
    let response = await GetUserAppsReq(UserName)

    return response
}
async function GetApps (OrgName){
    let response = await GetAppsReq(OrgName)

    return response
}
async function GetRequests (UserName){
    let response = await GetRequestsReq(UserName)

    return response
}


module.exports = {GetUserApps,GetApps, GetRequests}