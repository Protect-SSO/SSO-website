const axios = require('axios')
const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
})


const host = process.env.AUTH_HOST

async function GetUserAppsReq(username) {
    //request made to Auth API to Login a user

    //request
    let authResponse = await axios.post(host + "AppServices/GetUserApps",
    {//json payload
        UserName:username
    }).then(function(response) {
        //response from server
        return response.data
    }).catch(function(error){
        //if error happens
        return error
    }); 
    //return response
    return authResponse
}
async function GetAppsReq(OrgName) {
    //request made to Auth API to Login a user

    //request
    let authResponse = await axios.post(host + "AppServices/GetApps",
    {//json payload
        OrgName:OrgName
    }).then(function(response) {
        //response from server
        return response.data
    }).catch(function(error){
        //if error happens
        return error
    }); 
    //return response
    return authResponse
}

async function getRoute(AppName) {
    //request made to Auth API get route of an app

    //request
    let response = await axios.post(host + "AppServices/getRoute",
    {//json payload
        AppName:AppName
    }).then(function(response) {
        //response from server
        return response.data
    }).catch(function(error){
        //if error happens
        return error
    }); 
    //return response
    return response
}

async function RegisterAppReq(AppName, RedirectURL, OrgName) {
    //request made to Auth API to register an org and org owner
    
    //request
    let Response = await axios.post(host + "AppServices/RegisterApp",
    {//json payload
        AppName:AppName,
        RedirectURL:RedirectURL,
        OrgName:OrgName
    }).then(function(response) {
        //response from server
        return response.data
    }).catch(function(error){
        //if error happens
        return error
    }); 
    //return response
    return Response
}

async function RequestAppReq(AppName, UserName, OrgName) {
    //request made to Auth API to register an org and org owner
    
    //request
    let Response = await axios.post(host + "AppServices/RequestApp",
    {//json payload
        AppName:AppName,
        UserName:UserName,
        OrgName:OrgName
    }).then(function(response) {
        //response from server
        return response.data
    }).catch(function(error){
        //if error happens
        return error
    }); 
    //return response
    return Response
}
async function GetRequestsReq(UserName) {
    //request made to Auth API to register an org and org owner
    
    //request
    let Response = await axios.post(host + "AppServices/GetRequests",
    {//json payload
        UserName:UserName
    }).then(function(response) {
        //response from server
        return response.data
    }).catch(function(error){
        //if error happens
        return error
    }); 
    //return response
    return Response
}
async function GetOrgRequestsReq(OrgName) {
    //request made to Auth API to register an org and org owner
    
    //request
    let Response = await axios.post(host + "AppServices/GetOrgRequests",
    {//json payload
        OrgName:OrgName
    }).then(function(response) {
        //response from server
        return response.data
    }).catch(function(error){
        //if error happens
        return error
    }); 
    //return response
    return Response
}
async function AcceptRequestReq(AppName,UserName,OrgName) {
    //request made to Auth API to register an org and org owner
    
    //request
    let Response = await axios.post(host + "AppServices/AcceptRequest",
    {//json payload
        AppName:AppName,
        UserName:UserName,
        OrgName:OrgName
    }).then(function(response) {
        //response from server
        return response.data
    }).catch(function(error){
        //if error happens
        return error
    }); 
    //return response
    return Response
}
module.exports = {GetUserAppsReq, getRoute, RegisterAppReq,GetAppsReq, RequestAppReq, GetRequestsReq, GetOrgRequestsReq, AcceptRequestReq}