const axios = require('axios')
const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
})


const host = process.env.AUTH_HOST

async function LoginReq(username,password) {
    //request made to Auth API to Login a user

    //request
    let authResponse = await axios.post(host + "Auth/Login",
    {//json payload
        UserName:username,
        Password:password
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

async function OrgRegisterReq(OrgName, UserName, Password, FirstName, LastName, Email) {
    //request made to Auth API to register an org and org owner
    
    //request
    let authResponse = await axios.post(host + "Auth/RegisterOrg",
    {//json payload
        OrgName: OrgName,
        UserName:UserName,
        Password:Password,
        FirstName:FirstName,
        LastName:LastName,
        Email:Email
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

async function UserRegisterReq(UserName, Password, FirstName, LastName, Email, OrgName) {
    //request made to Auth API to register an org and org owner
    
    //request
    let authResponse = await axios.post(host + "Auth/RegisterUser",
    {//json payload
        UserName:UserName,
        Password:Password,
        FirstName:FirstName,
        LastName:LastName,
        Email:Email,
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

async function DecodeToken(Token) {
    //sends a request to the auth server to decode the token
    
    //request
    let authResponse = await axios.post(host + "Token/decode_token",
    {//json payload
        Token:Token,
        
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
module.exports = {LoginReq, OrgRegisterReq, UserRegisterReq,DecodeToken}