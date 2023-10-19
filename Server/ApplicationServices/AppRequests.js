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

module.exports = {GetUserAppsReq, getRoute}